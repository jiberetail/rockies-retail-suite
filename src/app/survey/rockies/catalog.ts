import cityConnectJersey from "@/assets/rockies-survey/jersey-city-connect-men.jpg";
import onFieldHat from "@/assets/rockies-survey/hat-on-field-black-purple.jpg";
import nikeHoodie from "@/assets/rockies-survey/hoodie-nike-black.jpg";
import legendTee from "@/assets/rockies-survey/tee-legend-purple.jpg";

export type RockiesMerchCategory = "jerseys" | "hats" | "sweatshirts" | "tshirts";

export interface RockiesMerchItem {
  id: string;
  name: string;
  audience: string;
  image: string;
  sourceUrl: string;
  collection?: string;
}

export interface RockiesCatalog {
  team: "Colorado Rockies";
  slug: "colorado-rockies";
  source: string;
  updatedAt: string;
  total: number;
  products: Record<RockiesMerchCategory, RockiesMerchItem[]>;
}

export const rockiesStoreUrl =
  "https://www.fanatics.com/mlb/colorado-rockies/o-2387+t-70661959+z-96499-2037321655";

const fallback = (
  id: string,
  name: string,
  audience: string,
  image: string,
  sourceUrl = rockiesStoreUrl,
): RockiesMerchItem => ({ id, name, audience, image, sourceUrl });

export const rockiesCatalogFallback: RockiesCatalog = {
  team: "Colorado Rockies",
  slug: "colorado-rockies",
  source: rockiesStoreUrl,
  updatedAt: "2026-06-03T22:20:33.771Z",
  total: 4,
  products: {
    jerseys: [
      fallback(
        "fallback-city-connect-jersey",
        "Men's Colorado Rockies Nike Purple/Light Blue 2025 City Connect Limited Jersey",
        "Men",
        cityConnectJersey,
      ),
    ],
    hats: [
      fallback(
        "fallback-on-field-hat",
        "Colorado Rockies New Era Authentic Collection On-Field 59FIFTY Hat",
        "Men",
        onFieldHat,
      ),
    ],
    sweatshirts: [
      fallback(
        "fallback-nike-hoodie",
        "Colorado Rockies Nike Authentic Collection Performance Hoodie",
        "Men",
        nikeHoodie,
      ),
    ],
    tshirts: [
      fallback(
        "fallback-legend-tee",
        "Colorado Rockies Nike Purple Legend Performance T-Shirt",
        "Men",
        legendTee,
      ),
    ],
  },
};

export const rockiesCategories: Array<{ id: RockiesMerchCategory; label: string }> = [
  { id: "jerseys", label: "Jerseys" },
  { id: "hats", label: "Hats" },
  { id: "sweatshirts", label: "Sweatshirts" },
  { id: "tshirts", label: "T-Shirts" },
];
