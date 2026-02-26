import type { NicheId } from "./lead";

const PUBLIC_ASSET_BASE_URL = "https://storage.vfwebdesign.co.uk/public-vfwebdesign";

function encodePath(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export function nicheImg(nicheId: string, filename: string) {
  const n = (nicheId ?? "").trim() || "plumber";
  const f = encodePath((filename ?? "").replace(/^\/+/, "").trim());
  return `${PUBLIC_ASSET_BASE_URL}/niches/${encodeURIComponent(n)}/${f}`;
}

export const NICHE_HERO_BG: Record<NicheId, string> = {
  plumber: nicheImg("plumber", "hero.webp"),
  electrician: nicheImg("electrician", "hero1.webp"),
  construction: nicheImg("construction", "hero2.webp"),
};

export const NICHE_ABOUT_IMG: Record<NicheId, string> = {
  plumber: nicheImg("plumber", "hero2.webp"),
  electrician: nicheImg("electrician", "hero2.webp"),
  construction: nicheImg("construction", "hero4.webp"),
};

