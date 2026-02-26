const R2_ASSET_BASE = "https://storage.vfwebdesign.co.uk/public-vfwebdesign/";
const LOCAL_ASSETS = new Set(["google-g.png", "trustpilot.png", "vf-logo.png"]);

function encodePath(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export function mainAsset(path: string) {
  const cleaned = path.replace(/^\/+/, "");
  return `${R2_ASSET_BASE}${cleaned}`;
}

export function localAsset(filename: string) {
  const cleaned = filename.replace(/^\/+/, "");
  return `/${cleaned}`;
}

export function resolveAsset(filename: string): string {
  const cleaned = filename.replace(/^\/+/, "");
  if (cleaned === "google-g.png") return `${R2_ASSET_BASE}niches/google-g.png`;
  if (LOCAL_ASSETS.has(cleaned)) return `${R2_ASSET_BASE}${cleaned}`;
  return mainAsset(cleaned);
}

export function nicheImg(niche: string, filename: string) {
  const cleaned = encodePath(filename.replace(/^\/+/, ""));
  return `${R2_ASSET_BASE}niches/${encodeURIComponent(niche)}/${cleaned}`;
}

export function resolveImageRef(imageRef: string | null | undefined, niche: string): string | null {
  const ref = (imageRef ?? "").trim();
  if (!ref) return null;

  // Support local Next.js `public/` assets (e.g. "/logo.png", "/hero.jpg")
  if (ref.startsWith("/")) return ref;

  if (ref.startsWith("gallery:")) {
    const parts = ref.split(":");
    const filename = parts[2] ?? "";
    if (!filename) return null;
    return nicheImg(niche, filename);
  }

  if (ref.startsWith("https://") || ref.startsWith("http://") || ref.startsWith("data:image/")) {
    return ref;
  }

  return nicheImg(niche, ref);
}

export function isProbablyExternalHref(href: string) {
  const h = href.trim().toLowerCase();
  return (
    h.startsWith("http://") ||
    h.startsWith("https://") ||
    h.startsWith("mailto:") ||
    h.startsWith("tel:") ||
    h.startsWith("data:")
  );
}

export function branded(href: string, leadQuery: string) {
  const q = (leadQuery ?? "").trim();
  if (!q) return href;

  const raw = href.trim();
  if (!raw) return raw;
  if (raw.startsWith("#")) return raw;
  if (isProbablyExternalHref(raw)) return raw;

  const [beforeHash, hash = ""] = raw.split("#", 2);
  const hasQuery = beforeHash.includes("?");
  const joiner = hasQuery ? "&" : "?";
  const next = `${beforeHash}${joiner}${q}${hash ? `#${hash}` : ""}`;
  return next;
}

