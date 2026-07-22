import cityConnectMen from "@/assets/rockies-survey/jersey-city-connect-men.jpg";
import onFieldHat from "@/assets/rockies-survey/hat-on-field-black-purple.jpg";
import legendTee from "@/assets/rockies-survey/tee-legend-purple.jpg";
import cityConnectYouth from "@/assets/rockies-survey/jersey-city-connect-youth.jpg";
import homeWomen from "@/assets/rockies-survey/jersey-home-women.jpg";
import velocityTee from "@/assets/rockies-survey/tee-velocity-purple.jpg";
import nikeHoodie from "@/assets/rockies-survey/hoodie-nike-black.jpg";
import cityConnectWomenTee from "@/assets/rockies-survey/tee-city-connect-women.jpg";
import nikeJacket from "@/assets/rockies-survey/jacket-nike-purple-black.jpg";
import americaBaseball from "@/assets/rockies-survey/collectible-baseball.jpg";
import rockiesEarrings from "@/assets/rockies-survey/accessory-earrings.jpg";

export type MerchandiseCategory =
  | "Jerseys"
  | "Hats"
  | "T-Shirts"
  | "Outerwear"
  | "Accessories & Gifts";

export type MerchandiseAudience = "All" | "Men" | "Women" | "Kids";

export interface RockiesProduct {
  id: string;
  name: string;
  shortName: string;
  category: MerchandiseCategory;
  audience: Exclude<MerchandiseAudience, "All"> | "Unisex";
  image: string;
  url: string;
  badge?: string;
}

export const merchandiseCategories: Array<{
  name: MerchandiseCategory;
  image: string;
  eyebrow: string;
}> = [
  { name: "Jerseys", image: cityConnectMen, eyebrow: "Authentic & replica" },
  { name: "Hats", image: onFieldHat, eyebrow: "Fitted & adjustable" },
  { name: "T-Shirts", image: legendTee, eyebrow: "Everyday fan gear" },
  { name: "Outerwear", image: nikeHoodie, eyebrow: "Hoodies & jackets" },
  { name: "Accessories & Gifts", image: americaBaseball, eyebrow: "Collectibles & more" },
];

export const rockiesProducts: RockiesProduct[] = [
  {
    id: "city-connect-limited-men",
    name: "Men's Colorado Rockies Nike Purple/Light Blue 2025 City Connect Limited Jersey",
    shortName: "2025 City Connect Limited Jersey",
    category: "Jerseys",
    audience: "Men",
    image: cityConnectMen,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-nike-2025-city-connect-limited-jersey-purple/light-blue/o-4521%2Bt-36335315%2Bp-3500784151136%2Bz-9-3698777491",
    badge: "City Connect",
  },
  {
    id: "city-connect-limited-youth",
    name: "Youth Colorado Rockies Nike Purple/Light Blue 2025 City Connect Limited Jersey",
    shortName: "Youth City Connect Limited Jersey",
    category: "Jerseys",
    audience: "Kids",
    image: cityConnectYouth,
    url: "https://www.fanatics.com/mlb/colorado-rockies/-colorado-rockies-nike-youth-2025-city-connect-limited-jersey-purple/light-blue/o-3487%2Bt-25774282%2Bp-5788345313366%2Bz-9-392604719",
    badge: "Youth",
  },
  {
    id: "home-replica-women",
    name: "Women's Colorado Rockies Nike White Home Replica Custom Jersey",
    shortName: "Women's White Home Replica Jersey",
    category: "Jerseys",
    audience: "Women",
    image: homeWomen,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-nike-womens-home-replica-team-jersey-white/o-3421%2Bt-36447593%2Bp-03050896160%2Bz-9-1067429274",
  },
  {
    id: "on-field-59fifty",
    name: "Men's Colorado Rockies New Era Black/Purple Authentic Collection On-Field 59FIFTY Fitted Hat",
    shortName: "On-Field 59FIFTY Fitted Hat",
    category: "Hats",
    audience: "Men",
    image: onFieldHat,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-new-era-authentic-collection-on-field-59fifty-structured-hat-black/purple/o-2310%2Bt-47552059%2Bp-13286850755%2Bz-9-451467872",
    badge: "On-Field",
  },
  {
    id: "legend-fuse-tee",
    name: "Men's Colorado Rockies Nike Purple Legend Fuse Performance T-Shirt",
    shortName: "Legend Fuse Performance T-Shirt",
    category: "T-Shirts",
    audience: "Men",
    image: legendTee,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-nike-legend-fuse-large-logo-dri-fit-t-shirt-purple/o-2343%2Bt-03554226%2Bp-806699458141%2Bz-8-3754070941",
  },
  {
    id: "velocity-tee",
    name: "Men's Colorado Rockies Nike Purple Authentic Collection Velocity Performance T-Shirt",
    shortName: "Velocity Performance T-Shirt",
    category: "T-Shirts",
    audience: "Men",
    image: velocityTee,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-nike-authentic-collection-velocity-dri-fit-t-shirt-purple/o-3432%2Bt-03002093%2Bp-3544143493126%2Bz-9-1295071805",
    badge: "Authentic Collection",
  },
  {
    id: "city-connect-flowy-tee",
    name: "Women's Colorado Rockies Nike White 2025 City Connect Flowy T-Shirt",
    shortName: "Women's City Connect Flowy T-Shirt",
    category: "T-Shirts",
    audience: "Women",
    image: cityConnectWomenTee,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-nike-womens-2025-city-connect-flowy-fashion-tri-blend-dri-fit-t-shirt-white/o-3410%2Bt-47550871%2Bp-6855344166756%2Bz-9-1494030125",
    badge: "City Connect",
  },
  {
    id: "nike-lightweight-hoodie",
    name: "Men's Colorado Rockies Nike Black Authentic Collection Lightweight Performance Hoodie",
    shortName: "Lightweight Performance Hoodie",
    category: "Outerwear",
    audience: "Men",
    image: nikeHoodie,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-nike-authentic-collection-lightweight-dri-fit-hoodie-heather-black/o-3410%2Bt-14662093%2Bp-576601026489%2Bz-8-1402019258",
    badge: "Authentic Collection",
  },
  {
    id: "nike-full-zip-jacket",
    name: "Men's Colorado Rockies Nike Purple/Black Authentic Collection Full-Zip Jacket",
    shortName: "Purple & Black Full-Zip Jacket",
    category: "Outerwear",
    audience: "Men",
    image: nikeJacket,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-nike-authentic-collection-raglan-performance-full-zip-jacket-purple/black/o-3498%2Bt-25668671%2Bp-9188459645216%2Bz-9-1312623819",
  },
  {
    id: "america-250-baseball",
    name: "Colorado Rockies Rawlings America 250 Baseball",
    shortName: "Rawlings America 250 Baseball",
    category: "Accessories & Gifts",
    audience: "Unisex",
    image: americaBaseball,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-rawlings-celebrating-americas-250th-dual-stitch-baseball/o-1298%2Bt-70112037%2Bp-1322153419528%2Bz-9-961778703",
    badge: "Collectible",
  },
  {
    id: "teardrop-earrings",
    name: "Colorado Rockies WinCraft Tear-Drop Earrings",
    shortName: "WinCraft Tear-Drop Earrings",
    category: "Accessories & Gifts",
    audience: "Women",
    image: rockiesEarrings,
    url: "https://www.fanatics.com/mlb/colorado-rockies/colorado-rockies-wincraft-tear-drop-dangle-earrings/o-3409%2Bt-81991937%2Bp-5631787214%2Bz-8-2286694537",
  },
];

export const audienceFilters: MerchandiseAudience[] = ["All", "Men", "Women", "Kids"];
