import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = path.join(ROOT, "public/catalog/colorado-rockies.json");
const TEAM_NAME = "Colorado Rockies";
const TEAM_SLUG = "colorado-rockies";
const FANATICS_URL =
  "https://www.fanatics.com/mlb/colorado-rockies/o-2387+t-70661959+z-96499-2037321655";
const PAGE_SIZE = 72;
const PAGE_TIMEOUT_MS = 55_000;
const DEVTOOLS_TIMEOUT_MS = 20_000;
const POLL_INTERVAL_MS = 750;
const MAX_PAGE_ATTEMPTS = 3;

const categories = [
  {
    key: "jerseys",
    label: "Jerseys",
    url: "https://www.fanatics.com/mlb/colorado-rockies/jerseys/o-5687+t-69330837+d-869969+z-7-3498509015",
  },
  {
    key: "hats",
    label: "Hats",
    url: "https://www.fanatics.com/mlb/colorado-rockies/hats/o-9087+t-81553171+d-6422117+z-8-559296156",
  },
  {
    key: "sweatshirts",
    label: "Sweatshirts",
    url: "https://www.fanatics.com/mlb/colorado-rockies/sweatshirts/o-3409+t-36667559+d-86116743+z-9-1947647250",
  },
  {
    key: "tshirts",
    label: "T-Shirts",
    url: "https://www.fanatics.com/mlb/colorado-rockies/t-shirts/o-2310+t-25333126+d-86770268+z-9-2568812871",
  },
];

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

class DevToolsClient {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();

    socket.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      if (!message.id) return;

      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      clearTimeout(pending.timer);

      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });

    socket.addEventListener("close", () => {
      const error = new Error("Chrome debugging connection closed");
      for (const pending of this.pending.values()) {
        clearTimeout(pending.timer);
        pending.reject(error);
      }
      this.pending.clear();
    });
  }

  call(method, params = {}, sessionId, timeoutMs = DEVTOOLS_TIMEOUT_MS) {
    const id = this.nextId;
    this.nextId += 1;

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out`));
      }, timeoutMs);

      this.pending.set(id, { resolve, reject, timer });
      this.socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
}

async function findChrome() {
  const configuredPath = process.env.FANATICS_CHROME_PATH;
  const candidates = [
    configuredPath,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next known Chrome/Chromium location.
    }
  }

  throw new Error(
    "Chrome was not found. Set FANATICS_CHROME_PATH to a Chrome or Chromium executable.",
  );
}

async function waitForDevToolsSocket(profileDirectory) {
  const portFile = path.join(profileDirectory, "DevToolsActivePort");
  const deadline = Date.now() + DEVTOOLS_TIMEOUT_MS;

  while (Date.now() < deadline) {
    try {
      const [port, socketPath] = (await readFile(portFile, "utf8")).trim().split("\n");
      if (port && socketPath) return `ws://127.0.0.1:${port}${socketPath}`;
    } catch {
      // Chrome creates DevToolsActivePort shortly after it starts.
    }
    await delay(100);
  }

  throw new Error("Chrome did not expose a debugging socket");
}

async function connectWebSocket(url) {
  const socket = new WebSocket(url);

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Chrome debugging connection timed out")), DEVTOOLS_TIMEOUT_MS);
    socket.addEventListener("open", () => {
      clearTimeout(timer);
      resolve();
    }, { once: true });
    socket.addEventListener("error", event => {
      clearTimeout(timer);
      reject(event.error ?? new Error("Chrome debugging connection failed"));
    }, { once: true });
  });

  return socket;
}

async function createPage(client) {
  const { targetId } = await client.call("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await client.call("Target.attachToTarget", { targetId, flatten: true });

  await client.call("Page.enable", {}, sessionId);
  await client.call("Runtime.enable", {}, sessionId);
  await client.call("Network.enable", {}, sessionId);
  await client.call("Network.setBlockedURLs", {
    urls: ["*.gif", "*.jpeg", "*.jpg", "*.mp4", "*.png", "*.svg", "*.webp", "*.woff", "*.woff2"],
  }, sessionId);

  return { targetId, sessionId };
}

async function evaluate(client, page, expression) {
  const response = await client.call("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  }, page.sessionId, DEVTOOLS_TIMEOUT_MS);

  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description ?? "Fanatics page evaluation failed");
  }

  return response.result?.value;
}

function pageUrl(categoryUrl, pageNumber, attempt) {
  const url = new URL(categoryUrl);
  url.searchParams.set("pageNumber", String(pageNumber));
  url.searchParams.set("pageSize", String(PAGE_SIZE));
  url.searchParams.set("sortOption", "TopSellers");
  if (attempt > 1) url.searchParams.set("_catalogRetry", String(attempt));
  return url.toString();
}

const extractPageExpression = `(() => {
  const bodyText = document.body?.innerText || '';
  const totals = Array.from(bodyText.matchAll(/\\b([\\d,]+)\\s+ITEMS\\b/gi), match =>
    Number(match[1].replaceAll(',', '')),
  ).filter(Boolean);

  const products = Array.from(document.querySelectorAll('img.product-image[alt]')).map(imageNode => {
    const anchor = imageNode.closest('a[href]');
    const rawImage = imageNode.currentSrc || imageNode.src || '';
    if (!anchor || !rawImage) return null;

    const productUrl = new URL(anchor.href, location.href);
    productUrl.search = '';
    productUrl.hash = '';

    const imageUrl = new URL(rawImage, location.href);
    imageUrl.searchParams.set('w', '600');

    return {
      name: imageNode.alt.trim(),
      image: imageUrl.href,
      sourceUrl: productUrl.href,
    };
  }).filter(Boolean);

  return {
    title: document.title,
    href: location.href,
    blocked: /access denied|verify you are human|powered and protected by/i.test(bodyText),
    failed: /something went wrong, please try again/i.test(bodyText),
    total: totals.length ? Math.max(...totals) : 0,
    products,
  };
})()`;

function canonicalProducts(items) {
  return Array.from(new Map(items.map(item => [item.sourceUrl, item])).values());
}

async function waitForProducts(client, page, requestedUrl, pageNumber) {
  const deadline = Date.now() + PAGE_TIMEOUT_MS;
  let bestResult = null;
  let unchangedPolls = 0;
  let previousCount = -1;

  while (Date.now() < deadline) {
    await delay(POLL_INTERVAL_MS);

    let result;
    try {
      result = await evaluate(client, page, extractPageExpression);
    } catch {
      continue;
    }

    if (!result || !result.href.startsWith(new URL(requestedUrl).origin)) continue;
    if (result.blocked) throw new Error("Fanatics blocked the catalog request");

    const products = canonicalProducts(result.products ?? []);
    const normalized = { ...result, products };
    if (!bestResult || products.length > bestResult.products.length) bestResult = normalized;

    unchangedPolls = products.length === previousCount ? unchangedPolls + 1 : 0;
    previousCount = products.length;

    const expected = result.total
      ? Math.max(0, Math.min(PAGE_SIZE, result.total - ((pageNumber - 1) * PAGE_SIZE)))
      : PAGE_SIZE;

    if (expected > 0 && products.length >= expected) return normalized;

    // The final result can stabilize below the advertised count if Fanatics removes
    // an item while the sync is in progress. The category-level validator will retry.
    if (result.total && products.length > 0 && unchangedPolls >= 8 && products.length >= Math.floor(expected * 0.95)) {
      return normalized;
    }
  }

  if (bestResult?.products.length) return bestResult;
  throw new Error(`Timed out waiting for Fanatics page ${pageNumber}`);
}

async function startBrowser(chromePath) {
  const profileDirectory = await mkdtemp(path.join(os.tmpdir(), "rockies-fanatics-catalog-"));
  let chrome;

  try {
    chrome = spawn(chromePath, [
      "--headless=new",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--disable-gpu",
      "--disable-sync",
      "--no-default-browser-check",
      "--no-first-run",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDirectory}`,
      "about:blank",
    ], { stdio: "ignore" });

    const socket = await connectWebSocket(await waitForDevToolsSocket(profileDirectory));
    return { chrome, client: new DevToolsClient(socket), profileDirectory };
  } catch (error) {
    chrome?.kill("SIGTERM");
    await rm(profileDirectory, { recursive: true, force: true }).catch(() => {});
    throw error;
  }
}

async function stopBrowser(browser) {
  await browser.client.call("Browser.close").catch(() => {});
  browser.chrome.kill("SIGTERM");
  await rm(browser.profileDirectory, { recursive: true, force: true }).catch(() => {});
}

async function scrapePage(client, category, pageNumber, attempt) {
  let page;
  const url = pageUrl(category.url, pageNumber, attempt);

  try {
    page = await createPage(client);
    client.call("Page.navigate", { url }, page.sessionId, PAGE_TIMEOUT_MS).catch(() => {});
    const result = await waitForProducts(client, page, url, pageNumber);
    if (!result.total) throw new Error("Fanatics did not report a category total");
    if (result.failed && !result.products.length) throw new Error("Fanatics returned an incomplete page");
    return result;
  } finally {
    if (page) {
      await client.call("Target.closeTarget", { targetId: page.targetId }).catch(() => {});
    }
  }
}

function isRockiesProduct(item) {
  if (!/\b(?:Colorado Rockies|Rockies)\b/i.test(item.name)) return false;

  try {
    const url = new URL(item.sourceUrl);
    const imageUrl = new URL(item.image);
    return url.hostname === "www.fanatics.com"
      && url.pathname.startsWith("/mlb/colorado-rockies/")
      && imageUrl.hostname === "fanatics.frgimages.com";
  } catch {
    return false;
  }
}

function inferAudience(name) {
  if (/\b(?:women's|womens|ladies)\b/i.test(name)) return "Women";
  if (/\b(?:youth|kids?|boys?|toddler|infant|baby)\b/i.test(name)) return "Kids";
  if (/\b(?:men's|mens|big & tall)\b/i.test(name)) return "Men";
  return "Unisex";
}

function catalogItem(item, collection) {
  return {
    id: createHash("sha1").update(item.sourceUrl).digest("hex").slice(0, 16),
    name: item.name,
    audience: inferAudience(item.name),
    image: item.image,
    sourceUrl: item.sourceUrl,
    collection,
  };
}

async function scrapeCategory(chromePath, category) {
  let browser;
  let pagesReadInBrowser = 3;

  const readPage = async pageNumber => {
    let lastError;

    for (let attempt = 1; attempt <= MAX_PAGE_ATTEMPTS; attempt += 1) {
      if (!browser || pagesReadInBrowser >= 3 || attempt > 1) {
        if (browser) await stopBrowser(browser);
        browser = undefined;
        await delay(attempt === 1 ? 500 : attempt * 1_500);

        try {
          browser = await startBrowser(chromePath);
          pagesReadInBrowser = 0;
        } catch (error) {
          lastError = error;
          continue;
        }
      }

      try {
        const result = await scrapePage(browser.client, category, pageNumber, attempt);
        pagesReadInBrowser += 1;
        return result;
      } catch (error) {
        lastError = error;
        pagesReadInBrowser = 3;
      }
    }

    throw new Error(`${category.label} page ${pageNumber} failed: ${lastError?.message ?? lastError}`);
  };

  try {
    const firstPage = await readPage(1);
    const reportedTotal = firstPage.total;
    const pageCount = Math.ceil(reportedTotal / PAGE_SIZE);
    let rawProducts = [...firstPage.products];

    console.log(`${category.label}: ${reportedTotal} products across ${pageCount} page${pageCount === 1 ? "" : "s"}`);

    for (let pageNumber = 2; pageNumber <= pageCount; pageNumber += 1) {
      const pageResult = await readPage(pageNumber);
      rawProducts.push(...pageResult.products);
      console.log(`${category.label}: read page ${pageNumber}/${pageCount}`);
    }

    rawProducts = canonicalProducts(rawProducts);
    const strictProducts = rawProducts.filter(isRockiesProduct);
    const dropped = rawProducts.length - strictProducts.length;

    if (rawProducts.length !== reportedTotal) {
      throw new Error(
        `${category.label} sync was incomplete: read ${rawProducts.length} unique products, Fanatics reported ${reportedTotal}`,
      );
    }

    if (dropped) {
      console.warn(`${category.label}: removed ${dropped} non-Rockies product${dropped === 1 ? "" : "s"}`);
    }

    return {
      category,
      reportedTotal,
      products: strictProducts.map(item => catalogItem(item, category.label)),
    };
  } finally {
    if (browser) await stopBrowser(browser);
  }
}

const chromePath = await findChrome();
const results = [];
for (const category of categories) {
  results.push(await scrapeCategory(chromePath, category));
}

const products = {};
const seenProductUrls = new Set();
let crossCategoryDuplicates = 0;

for (const result of results) {
  products[result.category.key] = result.products.filter(item => {
    if (seenProductUrls.has(item.sourceUrl)) {
      crossCategoryDuplicates += 1;
      return false;
    }
    seenProductUrls.add(item.sourceUrl);
    return true;
  });
}

if (crossCategoryDuplicates) {
  console.warn(
    `Removed ${crossCategoryDuplicates} cross-category duplicate${crossCategoryDuplicates === 1 ? "" : "s"}`,
  );
}

const total = Object.values(products).reduce((sum, items) => sum + items.length, 0);
const updatedAt = new Date().toISOString();

const catalog = {
  team: TEAM_NAME,
  slug: TEAM_SLUG,
  source: FANATICS_URL,
  updatedAt,
  total,
  products,
};

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, `${JSON.stringify(catalog, null, 2)}\n`);

console.log(
  `Wrote ${total} strict Rockies products to ${path.relative(ROOT, OUTPUT_PATH)}: ${results
    .map(result => `${result.category.key}=${products[result.category.key].length}`)
    .join(", ")}`,
);
