"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type { AboutFacts, NicheId } from "./lead";
import { coerceNiche, parseCommaList } from "./lead";
import { deriveColorVars, hexToRgb, mixRgb, rgbToHex, normalizeHexColor, type Rgb } from "./colors";
import { getNicheConfig, subLocation, type IconType, type NicheConfig } from "./niche-config";
import { NICHE_HERO_BG } from "./niche-images";

export type PreviewSection = "hero" | "brand" | "services" | "projects" | "reviews" | "trust";

export type ResolvedService = {
  id: string;
  label: string;
  description: string;
  imageRef: string;
  iconType?: IconType;
};

export type ResolvedProject = {
  title: string;
  location: string;
  summary: string;
  imageRef: string;
};

export type ResolvedReview = {
  text: string;
  name: string;
  town: string;
  serviceType?: string;
};

export type ResolvedSite = {
  niche: NicheId;
  companyName: string;
  location: string;
  phone: string;
  email: string;
  logoUrl: string | null;
  ctaText: string;
  emergencyAvailable: boolean;
  yearsInBusiness: string;
  openingHours: string;
  previewSection: PreviewSection | null;
  serviceAreas: string[];
  accreditations: string[];

  hero: {
    badge: string;
    title: string;
    subtitle: string;
    imageRefs: string[];
  };
  services: { heading: string; subtitle: string; items: ResolvedService[] };
  servicesAll: ResolvedService[];
  projects: { heading: string; subtitle: string; items: ResolvedProject[] };
  reviews: { heading: string; subtitle: string; items: ResolvedReview[] };
  trust: NicheConfig["trust"];
  about: { text: string; facts: AboutFacts };
};

type LeadParsed = {
  leadQueryString: string;

  t?: string;
  ni: NicheId;
  companyName?: string;
  location?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  ctaText?: string;
  cta?: string;
  emergencyAvailable?: boolean;
  yearsInBusiness?: string;
  openingHours?: string;
  teamPhotoUrl?: string;

  previewSection: PreviewSection | null;

  accreditations: string[];
  servicesOffered: string[];
  serviceAreas: string[];

  primaryColor: string | null;
  secondaryColor: string | null;
  accentColor: string | null;
  showPricing: boolean;

  pid?: string;
  lat?: number;
  lng?: number;
  gmu?: string;

  customServices: Array<[id: string, label: string]>;
  serviceDescriptions: Array<[serviceId: string, description: string]>;
  serviceImageRefs: Array<[serviceId: string, imageRef: string]>;
  recentProjects: Array<[title: string, location: string, summary: string, imageRef: string]>;
  customReviews: Array<[text: string, name: string, town: string]>;

  aboutText: string | null;
  aboutFacts: AboutFacts | null;
};

export type LeadContextValue = {
  pathname: string;
  leadQueryString: string;
  previewSection: PreviewSection | null;

  companyName: string;
  location: string;
  phone: string;
  email: string;
  logoUrl: string | null;
  ctaText: string;
  yearsInBusiness: string;
  openingHours: string;
  emergencyAvailable: boolean;

  primaryColor: string;
  secondaryColor: string;
  c1Dark: string;
  c2Dark: string;
  c2Light: string;

  servicesOffered: string[];
  customServices: Array<[id: string, label: string]>;
  serviceDescriptions: Array<[serviceId: string, description: string]>;
  serviceImageRefs: Array<[serviceId: string, imageRef: string]>;
  recentProjects: Array<[title: string, location: string, summary: string, imageRef: string]>;
  customReviews: Array<[text: string, name: string, town: string]>;
  aboutText: string | null;
  aboutFacts: AboutFacts | null;
  accreditations: string[];
  serviceAreas: string[];

  nicheConfig: NicheConfig;
  heroImageUrl: string;

  resolvedServices: ResolvedService[];
  resolvedProjects: ResolvedProject[];
  resolvedReviews: ResolvedReview[];

  site: ResolvedSite;

  cssVars: Record<string, string>;

  // Extra parsed flags (stored for completeness; not required by UI)
  showPricing: boolean;
  pid?: string;
  lat?: number;
  lng?: number;
  gmu?: string;
};

const LeadContext = React.createContext<LeadContextValue | null>(null);

function safeTrim(value: string | null | undefined) {
  const s = (value ?? "").trim();
  return s ? s : null;
}

function padBase64(s: string) {
  const mod = s.length % 4;
  if (mod === 0) return s;
  return s + "=".repeat(4 - mod);
}

function decodeBase64UrlToBytes(input: string): Uint8Array | null {
  const raw = (input ?? "").trim();
  if (!raw) return null;
  try {
    const normalized = padBase64(raw.replace(/-/g, "+").replace(/_/g, "/"));
    const bin = atob(normalized);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

function decodeBase64UrlToUtf8(input: string): string | null {
  const bytes = decodeBase64UrlToBytes(input);
  if (!bytes) return null;
  try {
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function decodeBase64UrlJson<T>(input: string): T | null {
  const s = decodeBase64UrlToUtf8(input);
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

function validateTupleArray(x: unknown, tupleLen: number) {
  if (!Array.isArray(x)) return [] as string[][];
  const out: string[][] = [];
  for (const item of x) {
    if (!Array.isArray(item)) continue;
    if (item.length !== tupleLen) continue;
    if (item.some((v) => typeof v !== "string")) continue;
    out.push(item as string[]);
  }
  return out;
}

function parseAboutFactsBitfield(value: string | null | undefined): AboutFacts | null {
  const raw = (value ?? "").trim();
  if (!raw) return null;
  if (!/^[01]{3,}$/.test(raw)) return null;
  return {
    familyRun: raw[0] === "1",
    local: raw[1] === "1",
    established: raw[2] === "1",
  };
}

function coercePreviewSection(value: string | null | undefined): PreviewSection | null {
  const v = (value ?? "").trim().toLowerCase();
  if (!v) return null;
  if (
    v === "hero" ||
    v === "brand" ||
    v === "services" ||
    v === "projects" ||
    v === "reviews" ||
    v === "trust"
  ) {
    return v;
  }
  return null;
}

function normalizeWeirdQueryString(input: string) {
  const raw = (input ?? "").replace(/^\?/, "").trim();
  if (!raw) return "";

  const decodeQueryComponent = (value: string) => {
    // Treat '+' as space (form-style query encoding). Literal plus should be encoded as %2B.
    return decodeURIComponent(value.replace(/\+/g, "%20"));
  };

  const out = new URLSearchParams();
  for (const segment of raw.split("&")) {
    const seg = segment.trim();
    if (!seg) continue;

    if (seg.includes("=")) {
      const [kRaw, vRaw = ""] = seg.split("=", 2);
      const k = decodeQueryComponent(kRaw);
      const v = decodeQueryComponent(vRaw);
      out.append(k, v);
      continue;
    }

    // Weird format: key is actually "k=v" but encoded as a key with empty value.
    const decoded = decodeQueryComponent(seg);
    if (decoded.includes("=")) {
      const [k, v = ""] = decoded.split("=", 2);
      out.append(k, v);
      continue;
    }

    out.append(decoded, "");
  }

  return out.toString();
}

function parseLeadQueryString(normalizedQueryString: string): LeadParsed {
  const sp = new URLSearchParams(normalizedQueryString);
  const leadQueryString = sp.toString();

  const ni = coerceNiche(sp.get("ni"));

  const companyName = safeTrim(sp.get("n")) ?? undefined;
  const location = safeTrim(sp.get("l")) ?? undefined;
  const phone = safeTrim(sp.get("ph")) ?? undefined;
  const email = safeTrim(sp.get("em")) ?? undefined;
  const logoUrl = safeTrim(sp.get("logo")) ?? undefined;
  const ctaText = safeTrim(sp.get("ctat")) ?? undefined;
  const cta = safeTrim(sp.get("cta")) ?? undefined;
  const openingHours = safeTrim(sp.get("hrs")) ?? undefined;
  const teamPhotoUrl = safeTrim(sp.get("tph")) ?? undefined;

  const t = safeTrim(sp.get("t")) ?? undefined;

  const emergencyRaw = safeTrim(sp.get("emg"));
  const emergencyAvailable = emergencyRaw === null ? undefined : emergencyRaw === "1";

  const yrsRaw = safeTrim(sp.get("yrs"));
  const yearsInBusiness = yrsRaw ?? undefined;

  const previewSection = coercePreviewSection(sp.get("sec"));

  const accreditations = parseCommaList(sp.get("acc"));
  const servicesOffered = parseCommaList(sp.get("svc"));
  const serviceAreas = parseCommaList(sp.get("areas"));

  const primaryColor = normalizeHexColor(sp.get("c1"));
  const secondaryColor = normalizeHexColor(sp.get("c2"));
  const accentColor = normalizeHexColor(sp.get("c2l"));

  const showPricing = safeTrim(sp.get("price")) === "1";

  const pid = safeTrim(sp.get("pid")) ?? undefined;
  const latRaw = safeTrim(sp.get("lat"));
  const lngRaw = safeTrim(sp.get("lng"));
  const lat = latRaw ? Number(latRaw) : undefined;
  const lng = lngRaw ? Number(lngRaw) : undefined;
  const gmu = safeTrim(sp.get("gmu")) ?? undefined;

  const csRaw = safeTrim(sp.get("cs"));
  const sdRaw = safeTrim(sp.get("sd"));
  const siRaw = safeTrim(sp.get("si"));
  const prRaw = safeTrim(sp.get("pr"));
  const revRaw = safeTrim(sp.get("rev"));

  const customServices = csRaw ? validateTupleArray(decodeBase64UrlJson<unknown>(csRaw), 2) : [];
  const serviceDescriptions = sdRaw
    ? validateTupleArray(decodeBase64UrlJson<unknown>(sdRaw), 2)
    : [];
  const serviceImageRefs = siRaw ? validateTupleArray(decodeBase64UrlJson<unknown>(siRaw), 2) : [];
  const recentProjects = prRaw ? validateTupleArray(decodeBase64UrlJson<unknown>(prRaw), 4) : [];
  const customReviews = revRaw ? validateTupleArray(decodeBase64UrlJson<unknown>(revRaw), 3) : [];

  const aboutTextRaw = safeTrim(sp.get("abt"));
  const aboutText = aboutTextRaw ? decodeBase64UrlToUtf8(aboutTextRaw) : null;
  const aboutFacts = parseAboutFactsBitfield(sp.get("f"));

  return {
    leadQueryString,
    t,
    ni,
    companyName,
    location,
    phone,
    email,
    logoUrl,
    ctaText,
    cta,
    emergencyAvailable,
    yearsInBusiness,
    openingHours,
    teamPhotoUrl,
    previewSection,
    accreditations,
    servicesOffered,
    serviceAreas,
    primaryColor,
    secondaryColor,
    accentColor,
    showPricing,
    pid,
    lat: typeof lat === "number" && Number.isFinite(lat) ? lat : undefined,
    lng: typeof lng === "number" && Number.isFinite(lng) ? lng : undefined,
    gmu,
    customServices: customServices as Array<[string, string]>,
    serviceDescriptions: serviceDescriptions as Array<[string, string]>,
    serviceImageRefs: serviceImageRefs as Array<[string, string]>,
    recentProjects: recentProjects as Array<[string, string, string, string]>,
    customReviews: customReviews as Array<[string, string, string]>,
    aboutText,
    aboutFacts,
  };
}

function deriveDarkLightVars(c1Hex: string, c2Hex: string) {
  const fallbackC1: Rgb = { r: 37, g: 99, b: 235 };
  const fallbackC2: Rgb = { r: 15, g: 23, b: 42 };
  const c1 = hexToRgb(c1Hex) ?? fallbackC1;
  const c2 = hexToRgb(c2Hex) ?? fallbackC2;
  const white: Rgb = { r: 255, g: 255, b: 255 };
  const black: Rgb = { r: 0, g: 0, b: 0 };

  const c1Dark = rgbToHex(mixRgb(c1, black, 0.2));
  const c2Dark = rgbToHex(mixRgb(c2, black, 0.2));
  const c2Light = rgbToHex(mixRgb(c2, white, 0.88));

  return { c1Dark, c2Dark, c2Light };
}

const ALIAS_MAPS: Partial<Record<NicheId, Record<string, string>>> = {
  plumber: {
    emergency_plumbing_repair: "emergency-plumbing",
    leak_repair: "leak-repair",
    drain_cleaning_and_snaking: "drain-unblocking",
    water_heater_replacement: "central-heating",
    fixture_installation: "general-plumbing",
  },
  electrician: {
    emergency_electrical_repair: "emergency-electrician",
    circuit_troubleshooting: "fault-finding",
    outlet_and_switch_adds: "consumer-unit",
    lighting_retrofits: "lighting",
    panel_upgrades: "consumer-unit",
  },
  construction: {
    bathroom_remodels: "renovations",
    drywall_repair_and_painting: "brickwork",
    flooring_installation: "kitchens",
    deck_building_and_repair: "groundworks",
    door_and_window_replacement: "extensions",
  },
};

function aliasServiceId(niche: NicheId, rawId: string) {
  const id = (rawId ?? "").trim();
  if (!id) return "";
  return ALIAS_MAPS[niche]?.[id] ?? id;
}

function subHero(s: string, location: string, years: string) {
  return s.replaceAll("{location}", location).replaceAll("{years}", years);
}

function pickFirstNonEmpty(...values: Array<string | null | undefined>) {
  for (const v of values) {
    const s = (v ?? "").trim();
    if (s) return s;
  }
  return "";
}

function humanizeId(id: string): string {
  return id
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildResolvedServices(parsed: LeadParsed, cfg: NicheConfig, heroImageUrl: string) {
  const cfgById = new Map(cfg.services.items.map((s) => [s.id, s]));
  const selectedIdsRaw = parsed.servicesOffered.length > 0 ? parsed.servicesOffered : cfg.services.items.map((s) => s.id);
  const selectedIds = selectedIdsRaw.map((id) => aliasServiceId(parsed.ni, id)).filter(Boolean);

  const rawDescOverrides = new Map(
    parsed.serviceDescriptions
      .filter(([, d]) => (d ?? "").trim())
  );
  const rawImgOverrides = new Map(
    parsed.serviceImageRefs
      .filter(([, r]) => (r ?? "").trim())
  );
  const aliasedDescOverrides = new Map(
    parsed.serviceDescriptions
      .map(([id, d]) => [aliasServiceId(parsed.ni, id), d] as const)
      .filter(([id, d]) => id && (d ?? "").trim())
  );
  const aliasedImgOverrides = new Map(
    parsed.serviceImageRefs
      .map(([id, r]) => [aliasServiceId(parsed.ni, id), r] as const)
      .filter(([id, r]) => id && (r ?? "").trim())
  );

  const resolved: ResolvedService[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < selectedIds.length; i++) {
    const id = selectedIds[i];
    const rawId = selectedIdsRaw[i];
    const cfgItem = cfgById.get(id);
    if (seen.has(id)) continue;
    seen.add(id);

    if (cfgItem) {
      const description = pickFirstNonEmpty(rawDescOverrides.get(rawId), aliasedDescOverrides.get(id), cfgItem.description, "");
      const imageRef = pickFirstNonEmpty(rawImgOverrides.get(rawId), aliasedImgOverrides.get(id), cfgItem.imageFilename, heroImageUrl);
      resolved.push({
        id,
        label: cfgItem.label,
        description,
        imageRef,
        iconType: cfgItem.iconType,
      });
    } else {
      const description = pickFirstNonEmpty(rawDescOverrides.get(rawId), aliasedDescOverrides.get(id), "");
      const imageRef = pickFirstNonEmpty(rawImgOverrides.get(rawId), aliasedImgOverrides.get(id), heroImageUrl);
      resolved.push({
        id,
        label: humanizeId(rawId),
        description,
        imageRef,
      });
    }
  }

  for (const [rawId, rawLabel] of parsed.customServices) {
    const id = aliasServiceId(parsed.ni, rawId);
    const label = (rawLabel ?? "").trim();
    if (!id || !label) continue;
    if (seen.has(id)) continue;
    seen.add(id);

    const description = pickFirstNonEmpty(rawDescOverrides.get(rawId), aliasedDescOverrides.get(id), "");
    const imageRef = pickFirstNonEmpty(rawImgOverrides.get(rawId), aliasedImgOverrides.get(id), heroImageUrl);
    resolved.push({ id, label, description, imageRef });
  }

  return resolved;
}

function buildServicesAll(parsed: LeadParsed, cfg: NicheConfig, heroImageUrl: string) {
  const descOverrides = new Map(
    parsed.serviceDescriptions
      .map(([id, d]) => [aliasServiceId(parsed.ni, id), d] as const)
      .filter(([id, d]) => id && (d ?? "").trim())
  );
  const imgOverrides = new Map(
    parsed.serviceImageRefs
      .map(([id, r]) => [aliasServiceId(parsed.ni, id), r] as const)
      .filter(([id, r]) => id && (r ?? "").trim())
  );

  return cfg.services.items.map((cfgItem) => {
    const id = cfgItem.id;
    const description = pickFirstNonEmpty(descOverrides.get(id), cfgItem.description, "");
    const imageRef = pickFirstNonEmpty(imgOverrides.get(id), cfgItem.imageFilename, heroImageUrl);
    return {
      id,
      label: cfgItem.label,
      description,
      imageRef,
      iconType: cfgItem.iconType,
    } satisfies ResolvedService;
  });
}

function buildResolvedProjects(parsed: LeadParsed, cfg: NicheConfig, heroImageUrl: string) {
  if (parsed.recentProjects.length > 0) {
    return parsed.recentProjects
      .map(([title, location, summary, imageRef]) => ({
        title: (title ?? "").trim(),
        location: (location ?? "").trim(),
        summary: (summary ?? "").trim(),
        imageRef: (imageRef ?? "").trim() || heroImageUrl,
      }))
      .filter((p) => p.title);
  }

  return cfg.projects.items.map((p) => ({
    title: p.title,
    location: p.location,
    summary: p.summary,
    imageRef: p.imageFilename,
  }));
}

function buildResolvedReviews(parsed: LeadParsed, cfg: NicheConfig) {
  if (parsed.customReviews.length > 0) {
    return parsed.customReviews
      .map(([text, name, town]) => ({
        text: (text ?? "").trim(),
        name: (name ?? "").trim(),
        town: (town ?? "").trim(),
      }))
      .filter((r) => r.text);
  }

  return cfg.reviews.items.map((r) => ({ ...r }));
}

function buildValue(pathname: string, normalizedQueryString: string): LeadContextValue {
  const parsed = parseLeadQueryString(normalizedQueryString);
  const cfg = getNicheConfig(parsed.ni);

  const companyName = pickFirstNonEmpty(parsed.companyName, cfg.defaultCompanyName);
  const location = pickFirstNonEmpty(parsed.location, cfg.defaultLocation);
  const phone = pickFirstNonEmpty(parsed.phone, cfg.defaultPhone);
  const email = pickFirstNonEmpty(parsed.email, cfg.defaultEmail);
  const ctaText = pickFirstNonEmpty(parsed.ctaText, cfg.defaultCtaText);
  const yearsInBusiness = pickFirstNonEmpty(parsed.yearsInBusiness, cfg.defaultYearsInBusiness);
  const openingHours = pickFirstNonEmpty(parsed.openingHours, cfg.defaultOpeningHours);
  const emergencyAvailable =
    typeof parsed.emergencyAvailable === "boolean"
      ? parsed.emergencyAvailable
      : cfg.defaultEmergencyAvailable;
  const logoUrl = parsed.logoUrl !== undefined ? (parsed.logoUrl.trim() ? parsed.logoUrl.trim() : null) : null;

  const heroImageUrl =
    pickFirstNonEmpty(parsed.teamPhotoUrl, NICHE_HERO_BG[parsed.ni], NICHE_HERO_BG.plumber);

  const primaryColor = parsed.primaryColor ?? cfg.defaultPrimaryColor;
  const secondaryColor = parsed.secondaryColor ?? cfg.defaultSecondaryColor;
  const { c1Dark, c2Dark, c2Light: c2LightDerived } = deriveDarkLightVars(primaryColor, secondaryColor);
  const c2Light = parsed.accentColor ?? c2LightDerived;

  const cssVars = {
    ...deriveColorVars(primaryColor, secondaryColor),
    "--c1-dark": c1Dark,
    "--c2-dark": c2Dark,
    "--c2-light": c2Light,
  };

  const serviceAreas = parsed.serviceAreas.length > 0 ? parsed.serviceAreas : cfg.defaultServiceAreas;
  const accreditations =
    parsed.accreditations.length > 0 ? parsed.accreditations : cfg.defaultAccreditations;

  const resolvedServices = buildResolvedServices(parsed, cfg, heroImageUrl);
  const resolvedProjects = buildResolvedProjects(parsed, cfg, heroImageUrl);
  const resolvedReviews = buildResolvedReviews(parsed, cfg);

  const heroBadge = cfg.hero.badge;
  const heroTitle = subHero(subLocation(cfg.hero.title, location), location, yearsInBusiness);
  const heroSubtitle = subHero(subLocation(cfg.hero.subtitle, location), location, yearsInBusiness);

  const servicesAll = buildServicesAll(parsed, cfg, heroImageUrl);

  const aboutText =
    parsed.aboutText?.trim()
      ? parsed.aboutText.trim()
      : cfg.about.text
          .replaceAll("{companyName}", companyName)
          .replaceAll("{location}", location);

  const site: ResolvedSite = {
    niche: parsed.ni,
    companyName,
    location,
    phone,
    email,
    logoUrl,
    ctaText,
    emergencyAvailable,
    yearsInBusiness,
    openingHours,
    previewSection: parsed.previewSection,
    serviceAreas,
    accreditations,
    hero: {
      badge: heroBadge,
      title: heroTitle,
      subtitle: heroSubtitle,
      imageRefs: [heroImageUrl],
    },
    services: { heading: cfg.services.heading, subtitle: cfg.services.subtitle, items: resolvedServices },
    servicesAll,
    projects: { heading: cfg.projects.heading, subtitle: cfg.projects.subtitle, items: resolvedProjects },
    reviews: { heading: cfg.reviews.heading, subtitle: cfg.reviews.subtitle, items: resolvedReviews },
    trust: cfg.trust,
    about: { text: aboutText, facts: parsed.aboutFacts ?? cfg.about.facts },
  };

  return {
    pathname,
    leadQueryString: parsed.leadQueryString,
    previewSection: parsed.previewSection,

    companyName,
    location,
    phone,
    email,
    logoUrl,
    ctaText,
    yearsInBusiness,
    openingHours,
    emergencyAvailable,

    primaryColor,
    secondaryColor,
    c1Dark,
    c2Dark,
    c2Light,

    servicesOffered: parsed.servicesOffered,
    customServices: parsed.customServices,
    serviceDescriptions: parsed.serviceDescriptions,
    serviceImageRefs: parsed.serviceImageRefs,
    recentProjects: parsed.recentProjects,
    customReviews: parsed.customReviews,
    aboutText: parsed.aboutText,
    aboutFacts: parsed.aboutFacts ?? cfg.about.facts,
    accreditations,
    serviceAreas,

    nicheConfig: cfg,
    heroImageUrl,

    resolvedServices,
    resolvedProjects,
    resolvedReviews,

    site,

    cssVars,

    showPricing: parsed.showPricing,
    pid: parsed.pid,
    lat: parsed.lat,
    lng: parsed.lng,
    gmu: parsed.gmu,
  } satisfies LeadContextValue;
}

export function LeadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = React.useMemo(() => {
    const hookQuery = searchParams.toString();
    const browserQuery =
      typeof window !== "undefined" ? window.location.search.replace(/^\?/, "") : "";
    const effective = normalizeWeirdQueryString(browserQuery || hookQuery);
    return buildValue(pathname, effective);
  }, [pathname, searchParams]);

  React.useEffect(() => {
    const root = document.documentElement;
    for (const [k, v] of Object.entries(value.cssVars)) {
      root.style.setProperty(k, v);
    }
  }, [value.cssVars]);

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function LeadProviderFallback({ children }: { children: React.ReactNode }) {
  const value = React.useMemo(() => {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
    const browserQuery =
      typeof window !== "undefined" ? window.location.search.replace(/^\?/, "") : "";
    const effective = normalizeWeirdQueryString(browserQuery);
    return buildValue(pathname, effective);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    for (const [k, v] of Object.entries(value.cssVars)) {
      root.style.setProperty(k, v);
    }
  }, [value.cssVars]);

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function LeadProviderFromQuery({
  children,
  queryString,
  pathname = "/",
}: {
  children: React.ReactNode;
  queryString: string;
  pathname?: string;
}) {
  const value = React.useMemo(() => {
    const effective = normalizeWeirdQueryString(queryString);
    return buildValue(pathname, effective);
  }, [pathname, queryString]);

  React.useEffect(() => {
    const root = document.documentElement;
    for (const [k, v] of Object.entries(value.cssVars)) {
      root.style.setProperty(k, v);
    }
  }, [value.cssVars]);

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLeadContext() {
  const ctx = React.useContext(LeadContext);
  if (!ctx) throw new Error("useLeadContext must be used within LeadProvider");
  return ctx;
}

