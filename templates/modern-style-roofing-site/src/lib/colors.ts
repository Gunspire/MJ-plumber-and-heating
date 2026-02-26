export type Rgb = { r: number; g: number; b: number };

export function normalizeHexColor(input: string | null | undefined): string | null {
  const s = (input ?? "").trim();
  if (!s) return null;
  const raw = s.startsWith("#") ? s.slice(1) : s;
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(raw)) return null;

  const hex =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;

  return `#${hex.toLowerCase()}`;
}

export function hexToRgb(hex: string): Rgb | null {
  const n = normalizeHexColor(hex);
  if (!n) return null;
  const v = n.slice(1);
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return { r, g, b };
}

export function rgbToHex(rgb: Rgb): string {
  const clamp = (x: number) => Math.max(0, Math.min(255, Math.round(x)));
  const to2 = (x: number) => clamp(x).toString(16).padStart(2, "0");
  return `#${to2(rgb.r)}${to2(rgb.g)}${to2(rgb.b)}`;
}

export function mixRgb(a: Rgb, b: Rgb, t: number): Rgb {
  const clamped = Math.max(0, Math.min(1, t));
  return {
    r: a.r + (b.r - a.r) * clamped,
    g: a.g + (b.g - a.g) * clamped,
    b: a.b + (b.b - a.b) * clamped,
  };
}

export function deriveColorVars(c1Hex: string, c2Hex: string) {
  const c1 = hexToRgb(c1Hex) ?? { r: 37, g: 99, b: 235 }; // fallback #2563eb
  const c2 = hexToRgb(c2Hex) ?? { r: 15, g: 23, b: 42 }; // fallback #0f172a

  const white: Rgb = { r: 255, g: 255, b: 255 };
  const black: Rgb = { r: 0, g: 0, b: 0 };

  const c1Hover = mixRgb(c1, black, 0.12);
  const c2Hover = mixRgb(c2, black, 0.10);
  const c1Soft = mixRgb(c1, white, 0.84);
  const c2Soft = mixRgb(c2, white, 0.92);
  const c1Tint = mixRgb(c1, white, 0.65);
  const c2Tint = mixRgb(c2, white, 0.65);

  const vars: Record<string, string> = {
    "--c1": rgbToHex(c1),
    "--c2": rgbToHex(c2),
    "--c1-hover": rgbToHex(c1Hover),
    "--c2-hover": rgbToHex(c2Hover),
    "--c1-soft": rgbToHex(c1Soft),
    "--c2-soft": rgbToHex(c2Soft),
    "--c1-tint": rgbToHex(c1Tint),
    "--c2-tint": rgbToHex(c2Tint),
    "--c1-rgb": `${Math.round(c1.r)} ${Math.round(c1.g)} ${Math.round(c1.b)}`,
    "--c2-rgb": `${Math.round(c2.r)} ${Math.round(c2.g)} ${Math.round(c2.b)}`,
  };

  return vars;
}

