export type SearchParamsLike = Record<string, string | string[] | undefined>;

export function stringifySearchParams(sp: SearchParamsLike | undefined | null): string {
  if (!sp) return "";
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") {
      if (v) usp.set(k, v);
      continue;
    }
    if (Array.isArray(v)) {
      for (const item of v) {
        if (typeof item === "string" && item) usp.append(k, item);
      }
    }
  }
  return usp.toString();
}

