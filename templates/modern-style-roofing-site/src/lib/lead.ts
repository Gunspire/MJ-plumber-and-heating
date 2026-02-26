import { normalizeHexColor } from "./colors";

export type NicheId = "plumber" | "electrician" | "construction";

export type AboutFacts = {
  familyRun: boolean;
  local: boolean;
  established: boolean;
};

export type CustomServices = Array<[id: string, label: string]>;
export type ServiceDescriptions = Array<[serviceId: string, description: string]>;
export type ServiceImageRefs = Array<[serviceId: string, imageRef: string]>;
export type RecentProjects = Array<
  [title: string, location: string, summary: string, imageRef: string]
>;
export type CustomReviews = Array<[text: string, name: string, town: string]>;

export type LeadParams = {
  ni: NicheId;
  n?: string;
  l?: string;
  c1?: string;
  c2?: string;
  ph?: string;
  em?: string;
  logo?: string;
  ctat?: string;
  emg?: "1" | "0";
  yrs?: string;
  hrs?: string;
  sec?: string;
  svc?: string;
  areas?: string;
  acc?: string;

  cs?: string;
  sd?: string;
  si?: string;
  pr?: string;
  rev?: string;
  abt?: string;
  f?: string;
};

export function coerceNiche(value: string | null | undefined): NicheId {
  const v = (value ?? "").trim().toLowerCase();
  if (v === "plumber" || v === "electrician" || v === "construction") return v;
  return "plumber";
}

export function parseCommaList(value: string | null | undefined): string[] {
  const raw = (value ?? "").trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function padBase64(s: string) {
  const mod = s.length % 4;
  if (mod === 0) return s;
  return s + "=".repeat(4 - mod);
}

export function decodeBase64UrlToString(input: string): string | null {
  try {
    const normalized = padBase64(input.replace(/-/g, "+").replace(/_/g, "/"));
    const decoded = atob(normalized);
    return decoded;
  } catch {
    return null;
  }
}

export function decodeBase64UrlJson<T>(input: string): T | null {
  const s = decodeBase64UrlToString(input);
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export function parseAboutFactsBitfield(value: string | null | undefined): AboutFacts | null {
  const v = (value ?? "").trim();
  if (!/^[01]{3}$/.test(v)) return null;
  return {
    familyRun: v[0] === "1",
    local: v[1] === "1",
    established: v[2] === "1",
  };
}

export function parseLeadParams(sp: URLSearchParams): LeadParams & {
  leadQuery: string;
  c1Hex: string | null;
  c2Hex: string | null;
  emergencyAvailable: boolean;
  serviceIds: string[];
  serviceAreas: string[];
  accreditations: string[];
  previewSection: string | null;
  customServices: CustomServices | null;
  serviceDescriptions: ServiceDescriptions | null;
  serviceImageRefs: ServiceImageRefs | null;
  recentProjects: RecentProjects | null;
  customReviews: CustomReviews | null;
  aboutText: string | null;
  aboutFacts: AboutFacts | null;
} {
  const leadQuery = sp.toString();

  const ni = coerceNiche(sp.get("ni"));
  const c1Hex = normalizeHexColor(sp.get("c1"));
  const c2Hex = normalizeHexColor(sp.get("c2"));
  const emergencyAvailable = sp.get("emg") === "1";
  const previewSection = sp.get("sec")?.trim() ? (sp.get("sec") as string).trim() : null;

  const serviceIds = parseCommaList(sp.get("svc"));
  const serviceAreas = parseCommaList(sp.get("areas"));
  const accreditations = parseCommaList(sp.get("acc"));

  const customServicesRaw = sp.get("cs");
  const serviceDescriptionsRaw = sp.get("sd");
  const serviceImageRefsRaw = sp.get("si");
  const recentProjectsRaw = sp.get("pr");
  const customReviewsRaw = sp.get("rev");
  const aboutTextRaw = sp.get("abt");

  const customServices = customServicesRaw
    ? decodeBase64UrlJson<unknown>(customServicesRaw)
    : null;
  const serviceDescriptions = serviceDescriptionsRaw
    ? decodeBase64UrlJson<unknown>(serviceDescriptionsRaw)
    : null;
  const serviceImageRefs = serviceImageRefsRaw ? decodeBase64UrlJson<unknown>(serviceImageRefsRaw) : null;
  const recentProjects = recentProjectsRaw ? decodeBase64UrlJson<unknown>(recentProjectsRaw) : null;
  const customReviews = customReviewsRaw ? decodeBase64UrlJson<unknown>(customReviewsRaw) : null;

  const aboutText = aboutTextRaw ? decodeBase64UrlToString(aboutTextRaw) : null;
  const aboutFacts = parseAboutFactsBitfield(sp.get("f"));

  const validateTupleArray = (x: unknown, tupleLen: number) => {
    if (!Array.isArray(x)) return null;
    const out: unknown[] = [];
    for (const item of x) {
      if (!Array.isArray(item)) continue;
      if (item.length !== tupleLen) continue;
      if (item.some((v) => typeof v !== "string")) continue;
      out.push(item);
    }
    return out as unknown;
  };

  const customServicesSafe = validateTupleArray(customServices, 2) as CustomServices | null;
  const serviceDescriptionsSafe = validateTupleArray(serviceDescriptions, 2) as ServiceDescriptions | null;
  const serviceImageRefsSafe = validateTupleArray(serviceImageRefs, 2) as ServiceImageRefs | null;
  const recentProjectsSafe = validateTupleArray(recentProjects, 4) as RecentProjects | null;
  const customReviewsSafe = validateTupleArray(customReviews, 3) as CustomReviews | null;

  return {
    leadQuery,
    ni,
    n: sp.get("n") ?? undefined,
    l: sp.get("l") ?? undefined,
    c1: sp.get("c1") ?? undefined,
    c2: sp.get("c2") ?? undefined,
    ph: sp.get("ph") ?? undefined,
    em: sp.get("em") ?? undefined,
    logo: sp.get("logo") ?? undefined,
    ctat: sp.get("ctat") ?? undefined,
    emg: (sp.get("emg") as "1" | "0" | null) ?? undefined,
    yrs: sp.get("yrs") ?? undefined,
    hrs: sp.get("hrs") ?? undefined,
    sec: sp.get("sec") ?? undefined,
    svc: sp.get("svc") ?? undefined,
    areas: sp.get("areas") ?? undefined,
    acc: sp.get("acc") ?? undefined,
    cs: sp.get("cs") ?? undefined,
    sd: sp.get("sd") ?? undefined,
    si: sp.get("si") ?? undefined,
    pr: sp.get("pr") ?? undefined,
    rev: sp.get("rev") ?? undefined,
    abt: sp.get("abt") ?? undefined,
    f: sp.get("f") ?? undefined,
    c1Hex,
    c2Hex,
    emergencyAvailable,
    serviceIds,
    serviceAreas,
    accreditations,
    previewSection,
    customServices: customServicesSafe,
    serviceDescriptions: serviceDescriptionsSafe,
    serviceImageRefs: serviceImageRefsSafe,
    recentProjects: recentProjectsSafe,
    customReviews: customReviewsSafe,
    aboutText,
    aboutFacts,
  };
}

