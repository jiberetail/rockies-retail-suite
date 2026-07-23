import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Clock,
  CreditCard,
  Frown,
  Home,
  Meh,
  MessageCircle,
  PackageSearch,
  Search,
  Smile,
  UserRoundX,
} from "lucide-react";
import { motion } from "motion/react";
import QRCode from "react-qr-code";
import dugoutStoreLogo from "figma:asset/1717564bc045af2e8f8bd35047159ec02ff7f332.png";
import rockiesLogo from "figma:asset/3ce6caf893a1cfd93859cedd6683984fc09f45fa.png";
import coorsField from "@/assets/rockies-survey/coors-field.jpg";
import {
  rockiesCatalogFallback,
  rockiesCategories,
  type RockiesCatalog,
  type RockiesMerchCategory,
  type RockiesMerchItem,
} from "./catalog";
import "@/styles/rockies-kiosk.css";

type Screen =
  | "welcome"
  | "language"
  | "location"
  | "survey"
  | "category"
  | "items"
  | "availability"
  | "feedback"
  | "rating"
  | "hearAbout"
  | "discount"
  | "complete";

type NavigationSnapshot = { screen: Screen; questionIndex: number };

const ROCKIES_DARK = "#1B102A";
const ROCKIES_PURPLE = "#4F2683";
const ROCKIES_ICE = "#A9D9EE";
const PRESS_DELAY_MS = 420;

const ROCKIES_SPLASH_VIDEO = `${import.meta.env.BASE_URL}media/rockies-splash.mp4`;

const languages = [
  { code: "English", label: "English" },
  { code: "Spanish", label: "Español" },
  { code: "Korean", label: "한국어" },
  { code: "Japanese", label: "日本語" },
  { code: "Chinese", label: "中文" },
];

const locations = [
  "United States",
  "Canada",
  "Mexico",
  "United Kingdom",
  "Japan",
  "South Korea",
  "China",
  "Other",
];

const questionText = [
  "Were you able to find what you were looking for?",
  "Are you satisfied with your shopping experience?",
  "Did you interact with any associates today?",
];

const feedbackChoices = [
  { label: "Could not find the item", Icon: PackageSearch, color: "#f97316" },
  { label: "Checkout was difficult", Icon: CreditCard, color: "#3b82f6" },
  { label: "Wait time was too long", Icon: Clock, color: "#f59e0b" },
  { label: "Needed more assistance", Icon: CircleHelp, color: "#10b981" },
  { label: "Associate was unfriendly", Icon: UserRoundX, color: "#a855f7" },
  { label: "Other", Icon: MessageCircle, color: "#06b6d4" },
];

const associateRatings = [
  { label: "Satisfied", Icon: Smile, color: "#22c55e", background: "linear-gradient(135deg,#16a34a,#22c55e)" },
  { label: "Neutral", Icon: Meh, color: "#9ca3af", background: "linear-gradient(135deg,#6b7280,#9ca3af)" },
  { label: "Dissatisfied", Icon: Frown, color: "#ef4444", background: "linear-gradient(135deg,#991b1b,#dc2626)" },
];

const hearAboutStoreOptions = [
  "Coors Field",
  "Rockies.com",
  "Team Email",
  "Social Media",
  "Friend or Family",
  "Google / Search",
  "Ballpark Signage",
  "TV or Radio",
  "Downtown Denver",
  "Hotel / Concierge",
  "Local Event",
  "Ticketing Email",
  "Walk-in",
  "Other",
];

function useMutedVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.muted = true;
    ref.current.volume = 0;
    void ref.current.play().catch(() => undefined);
  }, []);

  return ref;
}

function Background({ intro = false }: { intro?: boolean }) {
  const videoRef = useMutedVideo();
  const [videoFailed, setVideoFailed] = useState(false);

  if (intro) {
    return (
      <>
        <img
          src={coorsField}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "blur(18px) saturate(1.12)", opacity: 0.52, transform: "scale(1.1)" }}
        />
        {!videoFailed && (
          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Colorado Rockies cinematic splash video"
              className="rk-cinematic-video block h-full w-full origin-center object-cover"
              style={{
                filter: "saturate(1.12) contrast(1.08) brightness(0.98)",
                opacity: 0.99,
                willChange: "transform",
              }}
              onError={() => setVideoFailed(true)}
            >
              <source src={ROCKIES_SPLASH_VIDEO} type="video/mp4" />
            </video>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 78% 45% at 50% 24%, transparent 34%, rgba(15,7,25,0.48) 100%), linear-gradient(108deg, rgba(79,38,131,0.14) 0%, transparent 36%, rgba(169,217,238,0.08) 100%), linear-gradient(to bottom, rgba(10,5,18,0.2) 0%, rgba(10,5,18,0.1) 30%, rgba(14,8,22,0.6) 52%, rgba(15,8,25,0.9) 70%, rgba(15,8,25,0.96) 100%)",
          }}
        />
      </>
    );
  }

  return (
    <>
      <img src={coorsField} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.7 }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(27,16,42,0.24), rgba(27,16,42,0.62)), rgba(79,38,131,0.12)",
        }}
      />
    </>
  );
}

function NavButtons({
  onHome,
  onBack,
  isPressed,
  pressThen,
}: {
  onHome: () => void;
  onBack: () => void;
  isPressed: (id: string) => boolean;
  pressThen: (id: string, action: () => void) => void;
}) {
  return (
    <div className="absolute left-[7%] right-[7%] top-[4.5%] z-30 flex items-center justify-between">
      <motion.button
        data-testid="nav-back"
        aria-label="Back"
        onClick={() => pressThen("nav-back", onBack)}
        className="rounded-full border-2 bg-white p-3 shadow-lg"
        style={{ borderColor: ROCKIES_PURPLE, background: isPressed("nav-back") ? ROCKIES_ICE : "#fff" }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="h-5 w-5" style={{ color: ROCKIES_DARK }} />
      </motion.button>
      <motion.button
        data-testid="nav-home"
        aria-label="Start over"
        onClick={() => pressThen("nav-home", onHome)}
        className="rounded-full border-2 bg-white p-3 shadow-lg"
        style={{ borderColor: ROCKIES_PURPLE, background: isPressed("nav-home") ? ROCKIES_ICE : "#fff" }}
        whileTap={{ scale: 0.9 }}
      >
        <Home className="h-5 w-5" style={{ color: ROCKIES_DARK }} />
      </motion.button>
    </div>
  );
}

function TopLogo({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute left-0 right-0 top-0 z-20 flex justify-center"
    >
      <img
        src={dugoutStoreLogo}
        alt="Colorado Rockies Dugout Store"
        style={{
          width: compact ? "24%" : "29%",
          maxHeight: compact ? "6.4vh" : "8.4vh",
          objectFit: "contain",
          marginTop: compact ? "0.4%" : "0.8%",
          filter: "drop-shadow(0 0.45vh 0.9vh rgba(0,0,0,0.42))",
        }}
      />
    </motion.div>
  );
}

function ProductImage({ item, className = "" }: { item: RockiesMerchItem; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!item.image || failed) {
    return (
      <div className={`grid place-items-center bg-white px-3 text-center font-black ${className}`} style={{ color: ROCKIES_DARK }}>
        <span style={{ fontSize: "1.35em", lineHeight: 1.1 }}>{item.name}</span>
      </div>
    );
  }

  return (
    <img
      src={item.image}
      alt={item.name}
      decoding="async"
      loading="lazy"
      className={className}
      style={{ backgroundColor: "transparent", filter: "brightness(1.06) contrast(1.1)", mixBlendMode: "multiply" }}
      onError={() => setFailed(true)}
    />
  );
}

function merchandiseDisplayName(name: string) {
  return (
    name
      .replace(/Colorado Rockies/gi, "")
      .replace(/\b(Men's|Women's|Youth|Unisex|Toddler|Infant)\b/gi, "")
      .replace(/\s+/g, " ")
      .replace(/\s+-\s+/g, " - ")
      .trim() || name
  );
}

export function RockiesKioskSurvey() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [screenHistory, setScreenHistory] = useState<NavigationSnapshot[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCityState, setZipCityState] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<boolean[]>([]);
  const [catalog, setCatalog] = useState<RockiesCatalog>(rockiesCatalogFallback);
  const [selectedCategory, setSelectedCategory] = useState<RockiesMerchCategory>("jerseys");
  const [selectedProduct, setSelectedProduct] = useState<RockiesMerchItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleProductCount, setVisibleProductCount] = useState(40);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [hearAboutStore, setHearAboutStore] = useState("");
  const [email, setEmail] = useState("");
  const [pressedAction, setPressedAction] = useState<string | null>(null);
  const pressTimerRef = useRef<number | null>(null);

  const products = catalog.products[selectedCategory] ?? [];
  const filteredProducts = useMemo(
    () => products.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [products, searchQuery],
  );
  const displayedProducts = filteredProducts.slice(0, visibleProductCount);
  const canContinueLocation =
    Boolean(selectedLocation) && (selectedLocation !== "United States" || /^\d{5}$/.test(zipCode));

  const categoryCards = useMemo(
    () =>
      rockiesCategories.map((category) => ({
        ...category,
        item: catalog.products[category.id]?.[0],
      })),
    [catalog],
  );

  useEffect(() => {
    document.body.classList.add("rk-kiosk-active");
    return () => document.body.classList.remove("rk-kiosk-active");
  }, []);

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    const controller = new AbortController();

    fetch(`${basePath}catalog/colorado-rockies.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Catalog request failed with ${response.status}`);
        return response.json() as Promise<RockiesCatalog>;
      })
      .then((result) => {
        if (result.slug === "colorado-rockies" && result.total > 0) setCatalog(result);
      })
      .catch(() => {
        // A small Rockies-only fallback keeps the survey usable without the catalog snapshot.
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!/^\d{5}$/.test(zipCode)) {
      setZipCityState("");
      return;
    }

    let canceled = false;
    import("zipcodes")
      .then((zipcodes) => {
        const result = zipcodes.lookup(zipCode);
        if (!canceled) setZipCityState(result ? `${result.city}, ${result.state}` : "");
      })
      .catch(() => {
        if (!canceled) setZipCityState("");
      });

    return () => {
      canceled = true;
    };
  }, [zipCode]);

  useEffect(() => {
    setVisibleProductCount(40);
  }, [selectedCategory, searchQuery, products.length]);

  useEffect(() => {
    return () => {
      if (pressTimerRef.current !== null) window.clearTimeout(pressTimerRef.current);
    };
  }, []);

  const pressThen = (id: string, action: () => void) => {
    if (pressedAction) return;
    if (pressTimerRef.current !== null) window.clearTimeout(pressTimerRef.current);
    setPressedAction(id);
    pressTimerRef.current = window.setTimeout(() => {
      action();
      setPressedAction(null);
      pressTimerRef.current = null;
    }, PRESS_DELAY_MS);
  };

  const isPressed = (id: string) => pressedAction === id;

  const navigateTo = (nextScreen: Screen) => {
    if (nextScreen === screen) return;
    setScreenHistory((history) => [...history, { screen, questionIndex }]);
    setScreen(nextScreen);
  };

  const navBack = () => {
    const previous = screenHistory.at(-1);
    if (!previous) return;
    setScreenHistory((history) => history.slice(0, -1));
    setScreen(previous.screen);
    setQuestionIndex(previous.questionIndex);
  };

  const reset = () => {
    setScreen("welcome");
    setScreenHistory([]);
    setSelectedLanguage("English");
    setSelectedLocation("");
    setZipCode("");
    setZipCityState("");
    setQuestionIndex(0);
    setSurveyAnswers([]);
    setSelectedCategory("jerseys");
    setSelectedProduct(null);
    setSearchQuery("");
    setVisibleProductCount(40);
    setFeedback("");
    setRating("");
    setHearAboutStore("");
    setEmail("");
    setPressedAction(null);
  };

  const getPostSurveyScreen = (answers = surveyAnswers): Screen => {
    if (answers[1] === false) return "feedback";
    if (answers[2] === true) return "rating";
    return "hearAbout";
  };

  const answerQuestion = (answer: boolean, pressId: string) => {
    if (pressedAction) return;
    setPressedAction(pressId);
    const next = [...surveyAnswers];
    next[questionIndex] = answer;
    setSurveyAnswers(next);

    window.setTimeout(() => {
      setScreenHistory((history) => [...history, { screen: "survey", questionIndex }]);
      if (questionIndex < questionText.length - 1) {
        setQuestionIndex((index) => index + 1);
      } else {
        setScreen(next[0] === false ? "category" : getPostSurveyScreen(next));
      }
      setPressedAction(null);
    }, 360);
  };

  const shell = (children: ReactNode, options?: { compactLogo?: boolean; nav?: boolean }) => (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <Background />
      <TopLogo compact={options?.compactLogo} />
      {children}
      {options?.nav && (
        <NavButtons onBack={navBack} onHome={reset} isPressed={isPressed} pressThen={pressThen} />
      )}
    </div>
  );

  return (
    <div className="rk-kiosk-root flex h-screen min-w-0 flex-1 items-center justify-center overflow-hidden bg-white p-3">
      <section
        aria-live="polite"
        className="relative overflow-hidden bg-black shadow-2xl"
        style={{
          width: "min(100%, calc((100vh - 1.5rem) * 9 / 16), 1080px)",
          maxHeight: "calc(100vh - 1.5rem)",
          aspectRatio: "9 / 16",
          borderRadius: "0.75rem",
          fontSize: "clamp(8px, 1.38vh, 15px)",
        }}
      >
        {screen === "welcome" && (
          <div className="relative h-full w-full overflow-hidden" style={{ background: ROCKIES_DARK }}>
            <Background intro />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute left-0 right-0 top-0 z-20 origin-left"
              style={{ background: ROCKIES_ICE, height: "0.55vh" }}
            />
            <motion.img
              src={dugoutStoreLogo}
              alt="Colorado Rockies Dugout Store"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.58, ease: "easeOut" }}
              className="absolute left-1/2 top-[2.3%] z-10 -translate-x-1/2"
              style={{
                width: "35%",
                maxHeight: "10vh",
                objectFit: "contain",
                filter: "drop-shadow(0 0.8vh 1.8vh rgba(0,0,0,0.55))",
              }}
            />
            <motion.section
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.58, ease: "easeOut" }}
              className="rk-welcome-panel absolute inset-x-0 bottom-0 z-10 text-center"
              style={{
                background: "transparent",
                textShadow: "0 0.35vh 1.2vh rgba(0,0,0,0.72)",
              }}
            >
              <div aria-hidden="true" className="hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent 0, transparent 4.6vh, rgba(79,38,131,0.035) 4.6vh, rgba(79,38,131,0.035) calc(4.6vh + 1px))",
                  }}
                />
                <div
                  className="absolute left-1/2 top-0 h-[1.4vh] w-[3.2vh] -translate-x-1/2"
                  style={{ background: ROCKIES_ICE, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                />
                <motion.div
                  className="absolute left-[8%] right-[8%] top-[1.7vh] h-px origin-center"
                  style={{ background: `linear-gradient(90deg, transparent, ${ROCKIES_PURPLE}, ${ROCKIES_ICE}, transparent)` }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.52 }}
                  transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <img
                src={rockiesLogo}
                alt=""
                aria-hidden="true"
                className="hidden"
                style={{ opacity: 0.035 }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: [1, 1.06, 1], rotate: [0, -2, 0, 2, 0] }}
                transition={{
                  opacity: { delay: 0.5, duration: 0.35 },
                  scale: { delay: 0.9, duration: 2.2, repeat: Infinity, repeatDelay: 1.4 },
                  rotate: { delay: 0.9, duration: 3.6, repeat: Infinity, repeatDelay: 0.8 },
                }}
                className="absolute right-[5.5%] top-0 z-20 flex -translate-y-[7vh] flex-col items-center justify-center rounded-full border-4 border-white text-white"
                style={{
                  width: "min(9vh, 96px)",
                  height: "min(9vh, 96px)",
                  background: ROCKIES_PURPLE,
                  boxShadow: "0 1.2vh 3vh rgba(27,16,42,0.42)",
                }}
              >
                <span className="font-black" style={{ fontSize: "2.05em", lineHeight: 0.86 }}>10%</span>
                <span className="font-black uppercase" style={{ fontSize: "0.85em", lineHeight: 1 }}>Off</span>
              </motion.div>
              <div className="relative z-10 flex h-full flex-col items-center px-[8%] pb-[5%] pt-[4.5%]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.32, duration: 0.45 }}
                  className="flex w-full items-center justify-center gap-[3%]"
                >
                  <span style={{ width: "9%", height: 2, background: ROCKIES_ICE }} />
                  <p className="rk-welcome-kicker whitespace-nowrap font-black uppercase" style={{ color: "#FFFFFF", fontSize: "1.08em", lineHeight: 1 }}>
                    Colorado Rockies Dugout Store
                  </p>
                  <span style={{ width: "9%", height: 2, background: ROCKIES_ICE }} />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.52, ease: "easeOut" }}
                  className="rk-welcome-title mt-[3%] font-black uppercase"
                  style={{ color: "#FFFFFF", fontSize: "5em", lineHeight: 0.88 }}
                >
                  <motion.span className="block whitespace-nowrap" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.48, ease: "easeOut" }}>
                    Step up to
                  </motion.span>
                  <motion.span className="block whitespace-nowrap" style={{ color: ROCKIES_ICE }} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.48, ease: "easeOut" }}>
                    the plate.
                  </motion.span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.48, ease: "easeOut" }}
                  className="rk-welcome-offer mt-[3%] max-w-full font-bold"
                  style={{ color: "#FFFFFF", fontSize: "1.42em", lineHeight: 1.18 }}
                >
                  <span className="block whitespace-nowrap">Take the Dugout Store survey and catch a</span>
                  <span className="block whitespace-nowrap"><span style={{ color: ROCKIES_ICE }}>10% discount</span> on your next in-store purchase!</span>
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, scale: [1, 1, 1.025, 1] }}
                  transition={{
                    opacity: { delay: 0.48, duration: 0.46, ease: "easeOut" },
                    y: { delay: 0.48, duration: 0.46, ease: "easeOut" },
                    scale: { delay: 1.1, duration: 2.25, repeat: Infinity, repeatDelay: 0.7 },
                  }}
                  data-testid="start-survey"
                  onClick={() => pressThen("start-survey", () => navigateTo("language"))}
                  className="rk-welcome-cta relative mt-[5%] flex w-[86%] items-center justify-center gap-[3%] overflow-hidden rounded-[8px] border-2 py-[1.45vh] font-black uppercase text-white"
                  style={{
                    background: isPressed("start-survey") ? ROCKIES_DARK : ROCKIES_PURPLE,
                    borderColor: "#FFFFFF",
                    fontSize: "1.9em",
                    boxShadow: "0 1.1vh 3vh rgba(0,0,0,0.45)",
                  }}
                >
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[1.1vh]" style={{ background: ROCKIES_ICE }} />
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[38%]"
                    style={{ background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.72) 50%, rgba(255,255,255,0.1) 75%, transparent 100%)" }}
                    animate={{ x: ["-180%", "420%"] }}
                    transition={{ duration: 1.05, repeat: Infinity, repeatDelay: 1.55, ease: "easeInOut" }}
                  />
                  <span className="relative z-10">Start Survey</span>
                  <motion.span aria-hidden="true" className="relative z-10 flex" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.7 }}>
                    <ArrowRight strokeWidth={3} style={{ width: "1.45em", height: "1.45em" }} />
                  </motion.span>
                </motion.button>
              </div>
            </motion.section>
          </div>
        )}

        {screen === "language" &&
          shell(
            <div className="relative z-10 h-full px-8" style={{ paddingTop: "32%" }}>
              <h2 className="text-center font-black text-white" style={{ fontSize: "3.8em" }}>Select Your Language</h2>
              <p className="mb-6 mt-3 text-center font-bold text-white/85" style={{ fontSize: "1.7em" }}>Choose your preferred language.</p>
              <div className="flex flex-col gap-4">
                {languages.map((language) => (
                  <button
                    data-testid={`language-${language.code.toLowerCase()}`}
                    key={language.code}
                    onClick={() => {
                      setSelectedLanguage(language.code);
                      pressThen(`language-${language.code}`, () => navigateTo("location"));
                    }}
                    className="relative overflow-hidden rounded-xl border-2 font-black shadow-lg"
                    style={{
                      background: isPressed(`language-${language.code}`) ? ROCKIES_PURPLE : "rgba(255,255,255,0.78)",
                      borderColor: ROCKIES_DARK,
                      color: isPressed(`language-${language.code}`) ? "#fff" : ROCKIES_DARK,
                      height: "6.6vh",
                      fontSize: "2em",
                    }}
                  >
                    <span className="absolute bottom-0 left-0 top-0 w-3" style={{ background: ROCKIES_PURPLE }} />
                    {language.label}
                  </button>
                ))}
              </div>
            </div>,
            { nav: true },
          )}

        {screen === "location" &&
          shell(
            <div className="relative z-10 flex h-full flex-col px-6" style={{ paddingTop: "27%", paddingBottom: "14%" }}>
              <h2 className="text-center font-black uppercase leading-tight text-white" style={{ fontSize: "2.85em" }}>Select Your Location</h2>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {locations.map((location) => {
                  const locationId = `location-${location.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                  const active = selectedLocation === location;
                  return (
                    <button
                      data-testid={locationId}
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location);
                        if (location !== "United States") setZipCode("");
                      }}
                      className="relative overflow-hidden rounded-xl py-3 font-black shadow-lg"
                      style={{
                        background: active ? ROCKIES_PURPLE : "rgba(255,255,255,0.84)",
                        border: `3px solid ${ROCKIES_DARK}`,
                        color: active ? "#fff" : ROCKIES_DARK,
                        fontSize: "1.25em",
                        lineHeight: 1.05,
                      }}
                    >
                      <span className="absolute bottom-0 left-0 top-0 w-2" style={{ background: ROCKIES_ICE }} />
                      <span className="relative">{location}</span>
                    </button>
                  );
                })}
              </div>
              {selectedLocation === "United States" && (
                <div className="mt-3 rounded-xl border-2 bg-white/90 p-3 shadow-xl" style={{ borderColor: ROCKIES_DARK }}>
                  <label htmlFor="rockies-zip-code" className="block font-black uppercase" style={{ color: ROCKIES_DARK, fontSize: "1.1em" }}>Zip Code</label>
                  <div className="mt-1.5 grid grid-cols-[1.25fr_0.9fr] gap-3">
                    <input
                      id="rockies-zip-code"
                      data-testid="zip-code"
                      inputMode="numeric"
                      maxLength={5}
                      value={zipCode}
                      onChange={(event) => setZipCode(event.target.value.replace(/\D/g, "").slice(0, 5))}
                      className="w-full rounded-lg border-2 bg-white px-4 py-2 font-black outline-none"
                      style={{ borderColor: ROCKIES_PURPLE, color: ROCKIES_DARK, fontSize: "1.45em" }}
                      placeholder="00000"
                    />
                    <div
                      data-testid="zip-city-state"
                      className="flex items-center justify-center rounded-lg border-2 px-2 text-center font-black"
                      style={{ background: "#F0EBF5", borderColor: ROCKIES_PURPLE, color: ROCKIES_DARK, fontSize: "1.05em", lineHeight: 1.05 }}
                    >
                      {zipCityState || "City, ST"}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex-1" />
              <button
                data-testid="location-continue"
                disabled={!canContinueLocation}
                onClick={() => pressThen("location-continue", () => navigateTo("survey"))}
                className="w-full rounded-xl border-2 py-4 font-black uppercase shadow-xl disabled:opacity-45"
                style={{
                  background: isPressed("location-continue") ? ROCKIES_PURPLE : "#fff",
                  borderColor: ROCKIES_DARK,
                  color: isPressed("location-continue") ? "#fff" : ROCKIES_DARK,
                  fontSize: "2em",
                }}
              >
                Continue
              </button>
            </div>,
            { nav: true },
          )}

        {screen === "survey" &&
          shell(
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 pb-[12%] pt-[38%]">
              <p className="font-black uppercase text-white/80" style={{ fontSize: "1.45em" }}>Rockies Dugout Store Survey</p>
              <div className="my-6 h-1.5 w-24 rounded-full" style={{ background: ROCKIES_ICE }} />
              <h2 className="text-center font-black leading-tight text-white" style={{ fontSize: "3.55em" }}>{questionText[questionIndex]}</h2>
              <div className="mt-8 flex w-full flex-col gap-5">
                {[true, false].map((answer) => {
                  const surveyId = `survey-${questionIndex}-${answer ? "yes" : "no"}`;
                  return (
                    <button
                      data-testid={surveyId}
                      key={String(answer)}
                      onClick={() => answerQuestion(answer, surveyId)}
                      className="relative overflow-hidden rounded-xl border-2 font-black shadow-lg"
                      style={{
                        background: isPressed(surveyId) ? ROCKIES_PURPLE : "rgba(255,255,255,0.78)",
                        borderColor: ROCKIES_DARK,
                        color: isPressed(surveyId) ? "#fff" : ROCKIES_DARK,
                        height: "10vh",
                        fontSize: "3.8em",
                      }}
                    >
                      <span className="absolute bottom-0 left-0 top-0 w-3" style={{ background: ROCKIES_ICE }} />
                      {answer ? "Yes" : "No"}
                    </button>
                  );
                })}
              </div>
            </div>,
            { nav: true },
          )}

        {screen === "category" &&
          shell(
            <div className="relative z-10 flex h-full flex-col px-6" style={{ paddingTop: "21%", paddingBottom: "24%" }}>
              <div className="mb-4 flex items-center justify-center gap-3">
                <img src={rockiesLogo} alt="Colorado Rockies" className="h-[5.5vh] max-w-[10vh] object-contain" />
                <p className="font-black text-white" style={{ fontSize: "1.7em" }}>Colorado Rockies</p>
              </div>
              <h2 className="text-center font-black leading-tight text-white" style={{ fontSize: "2.55em", marginBottom: "4%" }}>WHAT TYPE OF MERCH WERE YOU LOOKING FOR?</h2>
              <div className="grid min-h-0 flex-1 grid-cols-2 gap-3" style={{ gridTemplateRows: "minmax(0, 1fr) minmax(0, 1fr)" }}>
                {categoryCards.map((category) => {
                  const categoryId = `category-${category.id}`;
                  return (
                    <button
                      data-testid={categoryId}
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSearchQuery("");
                        pressThen(categoryId, () => navigateTo("items"));
                      }}
                      className="flex min-h-0 flex-col"
                    >
                      <div
                        className="relative min-h-0 flex-1 overflow-hidden rounded-xl border-2 shadow-lg"
                        style={{
                          background: "#fff",
                          borderColor: ROCKIES_DARK,
                          outline: isPressed(categoryId) ? `4px solid ${ROCKIES_ICE}` : "none",
                          outlineOffset: "2px",
                        }}
                      >
                        {category.item && <ProductImage item={category.item} className="h-full w-full object-contain p-3" />}
                      </div>
                      <span className="mt-1 text-center font-black text-white" style={{ fontSize: "1.75em" }}>{category.label}</span>
                    </button>
                  );
                })}
              </div>
              <button
                data-testid="category-back-survey"
                onClick={() => pressThen("category-back-survey", navBack)}
                className="mt-3 w-full rounded-xl border-2 py-3 font-black"
                style={{
                  background: isPressed("category-back-survey") ? ROCKIES_PURPLE : "#fff",
                  borderColor: ROCKIES_DARK,
                  color: isPressed("category-back-survey") ? "#fff" : ROCKIES_DARK,
                  fontSize: "1.2em",
                }}
              >
                Back to Survey
              </button>
            </div>,
            { nav: true },
          )}

        {screen === "items" &&
          shell(
            <div className="relative z-10 flex h-full flex-col px-6" style={{ paddingTop: "22%", paddingBottom: "17%" }}>
              <div className="mb-2 flex items-center justify-center gap-3">
                <img src={rockiesLogo} alt="Colorado Rockies" className="h-[5.2vh] max-w-[9vh] object-contain" />
                <h2 className="font-black text-white" style={{ fontSize: "1.8em", lineHeight: 1 }}>
                  SELECT THE {selectedCategory === "tshirts" ? "T-SHIRT" : selectedCategory === "sweatshirts" ? "SWEATSHIRT OR JACKET" : selectedCategory.slice(0, -1).toUpperCase()} YOU COULD NOT FIND
                </h2>
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" style={{ width: "1.65em", height: "1.65em" }} />
                <input
                  data-testid="product-search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={`Search ${rockiesCategories.find((category) => category.id === selectedCategory)?.label ?? "merchandise"}...`}
                  className="w-full rounded-xl border-2 bg-white text-black shadow-sm outline-none"
                  style={{ borderColor: ROCKIES_DARK, fontSize: "1.35em", padding: "0.85em 0.85em 0.85em 3.3em" }}
                />
              </div>
              <div
                data-testid="product-scroll"
                className="min-h-0 flex-1 overflow-y-auto pr-1"
                style={{ scrollbarWidth: "thin" }}
                onScroll={(event) => {
                  const scrollArea = event.currentTarget;
                  if (scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 320) {
                    setVisibleProductCount((current) => Math.min(current + 40, filteredProducts.length));
                  }
                }}
              >
                <div className="grid grid-cols-2 gap-3 pb-[9vh]">
                  {displayedProducts.map((item) => {
                    const productId = `product-${item.id}`;
                    return (
                      <button
                        data-testid={productId}
                        key={item.id}
                        onClick={() => pressThen(productId, () => {
                          setSelectedProduct(item);
                          navigateTo("availability");
                        })}
                        className="overflow-hidden rounded-xl border-2 shadow-lg"
                        style={{
                          background: "#fff",
                          borderColor: ROCKIES_DARK,
                          outline: isPressed(productId) ? `4px solid ${ROCKIES_ICE}` : "none",
                          outlineOffset: "2px",
                        }}
                      >
                        <div className="bg-white" style={{ height: "14.2vh" }}>
                          <ProductImage item={item} className="h-full w-full object-contain p-2.5" />
                        </div>
                        <p
                          className="border-t p-2 text-center font-black text-black"
                          style={{
                            borderTopColor: ROCKIES_DARK,
                            display: "-webkit-box",
                            fontSize: "0.68em",
                            lineHeight: 1.04,
                            minHeight: "4.5em",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 4,
                          }}
                        >
                          {merchandiseDisplayName(item.name)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>,
            { nav: true, compactLogo: true },
          )}

        {screen === "availability" &&
          shell(
            <div className="relative z-10 flex h-full flex-col items-center px-7 text-center" style={{ paddingTop: "21%", paddingBottom: "9%" }}>
              <h2 className="font-black leading-tight text-white" style={{ fontSize: "2.5em" }}>Good news! This Rockies gear is available online.</h2>
              <p className="mt-2 font-bold leading-snug text-white" style={{ fontSize: "1.32em" }}>Ask an associate about in-store availability, or scan to shop this item.</p>
              {selectedProduct && (
                <div className="mt-4 w-full rounded-xl border-2 bg-white p-3 shadow-xl" style={{ borderColor: ROCKIES_DARK }}>
                  <div className="mx-auto grid place-items-center bg-white" style={{ height: "27vh", width: "27vh" }}>
                    <ProductImage item={selectedProduct} className="h-full w-full object-contain p-1" />
                  </div>
                  <p className="mt-2 font-black" style={{ color: ROCKIES_DARK, fontSize: "1em", lineHeight: 1.08 }}>
                    {merchandiseDisplayName(selectedProduct.name)}
                  </p>
                </div>
              )}
              {selectedProduct && (
                <div className="mt-3 flex items-center gap-3 rounded-xl border-2 bg-white p-2.5 shadow-xl" style={{ borderColor: ROCKIES_PURPLE }}>
                  <div className="grid place-items-center bg-white" style={{ height: "9.2vh", width: "9.2vh" }}>
                    <QRCode aria-label="QR code to shop this Rockies item" value={selectedProduct.sourceUrl} bgColor="#FFFFFF" fgColor={ROCKIES_DARK} level="M" size={256} style={{ height: "100%", width: "100%" }} />
                  </div>
                  <p className="text-left font-black uppercase" style={{ color: ROCKIES_DARK, fontSize: "1.08em", lineHeight: 1.08 }}>Scan to shop<br />Rockies gear</p>
                </div>
              )}
              <button
                data-testid="availability-continue"
                onClick={() => pressThen("availability-continue", () => navigateTo(getPostSurveyScreen()))}
                className="relative mt-auto w-full overflow-hidden rounded-xl py-4 font-black"
                style={{
                  background: isPressed("availability-continue") ? ROCKIES_PURPLE : "#fff",
                  border: `3px solid ${ROCKIES_DARK}`,
                  color: isPressed("availability-continue") ? "#fff" : ROCKIES_DARK,
                  fontSize: "1.8em",
                }}
              >
                <span className="absolute bottom-0 left-0 top-0 w-3" style={{ background: ROCKIES_ICE }} />
                <span className="relative">Continue</span>
              </button>
            </div>,
            { nav: true },
          )}

        {screen === "feedback" &&
          shell(
            <FeedbackIconScreen
              title="What Affected Your Shopping Experience?"
              options={feedbackChoices}
              selected={feedback}
              onSelect={setFeedback}
              continueActive={isPressed("feedback-continue")}
              onContinue={() => pressThen("feedback-continue", () => navigateTo(surveyAnswers[2] ? "rating" : "hearAbout"))}
            />,
            { nav: true },
          )}

        {screen === "rating" &&
          shell(
            <AssociateRatingScreen
              title="How Was Your Associate Interaction?"
              subtitle="Tell us how your interaction felt."
              options={associateRatings}
              selected={rating}
              onSelect={setRating}
              continueActive={isPressed("rating-continue")}
              onContinue={() => pressThen("rating-continue", () => navigateTo("hearAbout"))}
            />,
            { nav: true },
          )}

        {screen === "hearAbout" &&
          shell(
            <HearAboutStoreScreen
              title="How Did You Hear About Our Store?"
              options={hearAboutStoreOptions}
              selected={hearAboutStore}
              onSelect={setHearAboutStore}
              continueActive={isPressed("hear-about-continue")}
              onContinue={() => pressThen("hear-about-continue", () => navigateTo("discount"))}
            />,
            { nav: true },
          )}

        {screen === "discount" &&
          shell(
            <div className="relative z-10 flex h-full flex-col items-center px-8" style={{ paddingTop: "33%", paddingBottom: "14%", gap: "3.2%" }}>
              <h2 className="w-full text-center font-black uppercase text-white" style={{ fontSize: "2.55em", lineHeight: 1.04 }}>
                <span className="whitespace-nowrap">Get 10% Off Your Next</span><br />
                <span className="whitespace-nowrap">In-Store Purchase</span>
              </h2>
              <p className="w-full text-center font-bold text-white" style={{ fontSize: "1.55em" }}>Please enter your email address</p>
              <input
                data-testid="discount-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-xl border-2 bg-white text-black outline-none"
                style={{ borderColor: ROCKIES_DARK, fontSize: "1.55em", padding: "0.95em 1.1em" }}
              />
              <button
                data-testid="discount-continue"
                disabled={!email.includes("@")}
                onClick={() => pressThen("discount-continue", () => navigateTo("complete"))}
                className="w-full rounded-xl border-2 font-black disabled:opacity-45"
                style={{
                  background: isPressed("discount-continue") ? ROCKIES_PURPLE : "#fff",
                  borderColor: ROCKIES_DARK,
                  color: isPressed("discount-continue") ? "#fff" : ROCKIES_DARK,
                  fontSize: "1.7em",
                  padding: "1em 0",
                }}
              >
                Continue
              </button>
              <p className="mt-auto text-center font-bold text-white/75" style={{ fontSize: "0.9em", lineHeight: 1.25 }}>
                Discount fulfillment requires connection to the approved Dugout Store email service.
              </p>
            </div>,
            { nav: true },
          )}

        {screen === "complete" &&
          shell(
            <SimpleEndScreen
              icon={<CheckCircle2 size={82} />}
              title="Thank You"
              body="Your feedback has been recorded. Please see a Dugout Store associate for discount details."
              primary="Close"
              primaryActive={isPressed("complete-close")}
              onPrimary={() => pressThen("complete-close", reset)}
            />,
          )}
      </section>
    </div>
  );
}

function SimpleEndScreen({
  icon,
  title,
  body,
  primary,
  onPrimary,
  primaryActive = false,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  primary: string;
  onPrimary: () => void;
  primaryActive?: boolean;
}) {
  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
      <div className="text-white">{icon}</div>
      <h2 className="mt-6 font-black text-white" style={{ fontSize: "4.3em", lineHeight: 1 }}>{title}</h2>
      <p className="mt-5 font-bold text-white/85" style={{ fontSize: "2em", lineHeight: 1.25 }}>{body}</p>
      <button
        onClick={onPrimary}
        className="mt-9 w-full rounded-xl border-2 py-4 font-black"
        style={{
          background: primaryActive ? ROCKIES_PURPLE : "#fff",
          borderColor: ROCKIES_DARK,
          color: primaryActive ? "#fff" : ROCKIES_DARK,
          fontSize: "2em",
        }}
      >
        {primary}
      </button>
    </div>
  );
}

function HearAboutStoreScreen({
  title,
  options,
  selected,
  onSelect,
  onContinue,
  continueActive = false,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  onContinue: () => void;
  continueActive?: boolean;
}) {
  return (
    <div className="relative z-10 flex h-full flex-col px-6" style={{ paddingTop: "24%", paddingBottom: "12%" }}>
      <h2 className="text-center font-black leading-tight text-white" style={{ fontSize: "2.45em" }}>{title}</h2>
      <div className="mt-5 grid min-h-0 flex-1 grid-cols-2 gap-2.5">
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              onClick={() => onSelect(isSelected ? "" : option)}
              className="relative min-h-0 overflow-hidden rounded-xl border-2 px-2 py-2 font-black shadow-lg"
              style={{
                background: isSelected ? ROCKIES_PURPLE : "rgba(255,255,255,0.88)",
                borderColor: ROCKIES_DARK,
                color: isSelected ? "#fff" : ROCKIES_DARK,
                fontSize: "1.02em",
                lineHeight: 1.05,
              }}
            >
              <span className="absolute bottom-0 left-0 top-0 w-2" style={{ background: ROCKIES_ICE }} />
              <span className="relative">{option}</span>
            </button>
          );
        })}
      </div>
      <button
        disabled={!selected}
        onClick={onContinue}
        className="mt-4 rounded-xl border-2 py-4 font-black disabled:opacity-45"
        style={{
          background: continueActive ? ROCKIES_PURPLE : "#fff",
          borderColor: ROCKIES_DARK,
          color: continueActive ? "#fff" : ROCKIES_DARK,
          fontSize: "1.9em",
        }}
      >
        Continue
      </button>
    </div>
  );
}

function FeedbackIconScreen({
  title,
  options,
  selected,
  onSelect,
  onContinue,
  continueActive = false,
}: {
  title: string;
  options: Array<{ label: string; Icon: typeof Search; color: string }>;
  selected: string;
  onSelect: (value: string) => void;
  onContinue: () => void;
  continueActive?: boolean;
}) {
  return (
    <div className="relative z-10 flex h-full flex-col px-6" style={{ paddingTop: "25%", paddingBottom: "12%" }}>
      <h2 className="text-center font-black leading-tight text-white" style={{ fontSize: "2.45em" }}>{title}</h2>
      <div className="mt-5 grid min-h-0 flex-1 grid-cols-2 gap-3" style={{ gridTemplateRows: "repeat(3, minmax(0, 1fr))" }}>
        {options.map((option) => {
          const isSelected = selected === option.label;
          const Icon = option.Icon;
          return (
            <button key={option.label} onClick={() => onSelect(option.label)} className="relative min-h-0 overflow-hidden rounded-xl border-2 shadow-lg" style={{ borderColor: ROCKIES_DARK }}>
              <div className="absolute inset-0 transition-all duration-300" style={{ background: isSelected ? ROCKIES_PURPLE : "#fff" }} />
              <div className="absolute bottom-0 left-0 top-0 w-2" style={{ background: ROCKIES_ICE }} />
              <div className="relative flex h-full flex-col items-center justify-center gap-2 px-2 py-3">
                <div
                  className="grid place-items-center rounded-full"
                  style={{
                    background: isSelected ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.92)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.14)",
                    color: isSelected ? "#fff" : option.color,
                    height: "4.1em",
                    width: "4.1em",
                  }}
                >
                  <Icon style={{ width: "2.35em", height: "2.35em" }} />
                </div>
                <span className="text-center font-black" style={{ color: isSelected ? "#fff" : "#111", fontSize: "1.02em", lineHeight: 1.08 }}>{option.label}</span>
              </div>
            </button>
          );
        })}
      </div>
      <button
        disabled={!selected}
        onClick={onContinue}
        className="mt-4 rounded-xl border-2 py-4 font-black disabled:opacity-45"
        style={{
          background: continueActive ? ROCKIES_PURPLE : "#fff",
          borderColor: ROCKIES_DARK,
          color: continueActive ? "#fff" : ROCKIES_DARK,
          fontSize: "1.9em",
        }}
      >
        Continue
      </button>
    </div>
  );
}

function AssociateRatingScreen({
  title,
  subtitle,
  options,
  selected,
  onSelect,
  onContinue,
  continueActive = false,
}: {
  title: string;
  subtitle: string;
  options: Array<{ label: string; Icon: typeof Search; color: string; background: string }>;
  selected: string;
  onSelect: (value: string) => void;
  onContinue: () => void;
  continueActive?: boolean;
}) {
  return (
    <div className="relative z-10 flex h-full flex-col items-center px-6" style={{ paddingTop: "28%", paddingBottom: "12%" }}>
      <h2 className="text-center font-black leading-tight text-white" style={{ fontSize: "2.55em" }}>{title}</h2>
      <p className="mt-2 text-center font-bold text-white/80" style={{ fontSize: "1.32em" }}>{subtitle}</p>
      <div className="mt-4 flex min-h-0 w-full flex-1 flex-col gap-3">
        {options.map((option) => {
          const isSelected = selected === option.label;
          const Icon = option.Icon;
          return (
            <button key={option.label} onClick={() => onSelect(option.label)} className="relative flex min-h-0 flex-1 items-center overflow-hidden rounded-xl border-2 shadow-lg" style={{ borderColor: ROCKIES_DARK, padding: "0.85em 1.25em", gap: "1em" }}>
              <div className="absolute inset-0 transition-all duration-300" style={{ background: isSelected ? option.background : "rgba(255,255,255,0.72)" }} />
              <div className="absolute bottom-0 left-0 top-0 w-2" style={{ background: ROCKIES_ICE }} />
              <div
                className="relative grid shrink-0 place-items-center rounded-full"
                style={{
                  background: isSelected ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.92)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  color: isSelected ? "#fff" : option.color,
                  height: "4.6em",
                  width: "4.6em",
                }}
              >
                <Icon style={{ height: "2.9em", width: "2.9em" }} />
              </div>
              <span className="relative font-black" style={{ color: isSelected ? "#fff" : "#111", fontSize: "2em", lineHeight: 1.08 }}>{option.label}</span>
            </button>
          );
        })}
      </div>
      <button
        disabled={!selected}
        onClick={onContinue}
        className="mt-4 w-full rounded-xl border-2 py-4 font-black disabled:opacity-45"
        style={{
          background: continueActive ? ROCKIES_PURPLE : "#fff",
          borderColor: ROCKIES_DARK,
          color: continueActive ? "#fff" : ROCKIES_DARK,
          fontSize: "1.9em",
        }}
      >
        Continue
      </button>
    </div>
  );
}
