export type AccreditationId = string;
export type ContactMethod = "call" | "whatsapp" | "quote";
export type UpsellId = string;
export type TemplateId = "modern" | "waves";

export type RecentProject = {
  title: string;
  location?: string;
  summary: string;
  imageRef?: string;
};

export type CustomReview = {
  text: string;
  name: string;
  town: string;
};

export type LeadPreviewState = {
  templateId: TemplateId;
  niche: string;
  companyName: string;
  location: string;
  phone: string;
  email: string;
  contactMethod: ContactMethod;
  ctaText: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  logoUrl?: string;
  teamPhotoUrl?: string;
  yearsInBusiness?: number;
  openingHours?: string;
  aboutText?: string;
  accreditations: AccreditationId[];
  servicesOffered: string[];
  customServices: { id: string; label: string }[];
  serviceDescriptions: Record<string, string>;
  serviceImageRefs: Record<string, string>;
  recentProjects: RecentProject[];
  customReviews: CustomReview[];
  serviceAreas: string[];
  emergencyAvailable: boolean;
  showPricing: boolean;
  aboutFacts: { familyRun: boolean; local: boolean; established: boolean };
  upsells: UpsellId[];
  placeId?: string;
  lat?: number;
  lng?: number;
  googleMapsUrl?: string;
};

function toB64Url(value: string): string {
  try {
    if (typeof btoa === "function") {
      return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
  } catch {
    // fallback below
  }
  return Buffer.from(value, "utf8").toString("base64url");
}

export function toPreviewQuery(lead: LeadPreviewState): string {
  const qs = new URLSearchParams();
  qs.set("t", lead.templateId);
  if (lead.niche) qs.set("ni", lead.niche);
  if (lead.companyName) qs.set("n", lead.companyName);
  if (lead.location) qs.set("l", lead.location);
  if (lead.primaryColor) qs.set("c1", lead.primaryColor);
  if (lead.secondaryColor) qs.set("c2", lead.secondaryColor);
  if (lead.accentColor) qs.set("c2l", lead.accentColor);
  if (lead.logoUrl) qs.set("logo", lead.logoUrl);
  if (lead.phone) qs.set("ph", lead.phone);
  if (lead.email) qs.set("em", lead.email);
  if (lead.contactMethod && lead.contactMethod !== "call") qs.set("cta", lead.contactMethod);
  if (lead.ctaText && lead.ctaText !== "Get a Free Quote") qs.set("ctat", lead.ctaText);
  if (lead.emergencyAvailable) qs.set("emg", "1");
  if (lead.showPricing) qs.set("price", "1");
  if (lead.yearsInBusiness != null) qs.set("yrs", String(lead.yearsInBusiness));
  if (lead.openingHours) qs.set("hrs", lead.openingHours);
  if (lead.aboutText) qs.set("abt", toB64Url(String(lead.aboutText).slice(0, 2000)));
  if (lead.teamPhotoUrl) qs.set("tph", lead.teamPhotoUrl);
  if (lead.accreditations?.length) qs.set("acc", lead.accreditations.join(","));
  if (lead.servicesOffered?.length) qs.set("svc", lead.servicesOffered.join(","));
  if (lead.customServices?.length) qs.set("cs", toB64Url(JSON.stringify(lead.customServices.slice(0, 10).map((s) => [s.id, s.label]))));
  if (lead.serviceDescriptions && Object.keys(lead.serviceDescriptions).length > 0) {
    qs.set("sd", toB64Url(JSON.stringify(Object.entries(lead.serviceDescriptions).slice(0, 20))));
  }
  if (lead.serviceImageRefs && Object.keys(lead.serviceImageRefs).length > 0) {
    qs.set("si", toB64Url(JSON.stringify(Object.entries(lead.serviceImageRefs).slice(0, 20))));
  }
  if (lead.recentProjects?.length) {
    qs.set(
      "pr",
      toB64Url(
        JSON.stringify(
          lead.recentProjects.slice(0, 3).map((p) => [p.title, p.location ?? "", p.summary, p.imageRef ?? ""])
        )
      )
    );
  }
  if (lead.customReviews?.length) {
    qs.set("rev", toB64Url(JSON.stringify(lead.customReviews.slice(0, 3).map((r) => [r.text, r.name, r.town]))));
  }
  if (lead.serviceAreas?.length) qs.set("areas", lead.serviceAreas.join(","));
  if (lead.upsells?.length) qs.set("up", lead.upsells.join(","));
  if (lead.placeId) qs.set("pid", lead.placeId);
  if (lead.lat != null) qs.set("lat", String(lead.lat));
  if (lead.lng != null) qs.set("lng", String(lead.lng));
  if (lead.googleMapsUrl) qs.set("gmu", lead.googleMapsUrl);

  const facts = lead.aboutFacts;
  if (facts && (facts.familyRun || facts.local || facts.established)) {
    qs.set("f", `${facts.familyRun ? "1" : "0"}${facts.local ? "1" : "0"}${facts.established ? "1" : "0"}`);
  }

  return qs.toString();
}

export function withLeadQuery(href: string, leadQuery: string): string {
  const q = leadQuery.trim();
  if (!q) return href;
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith("#")) return href;
  const [beforeHash, hash] = href.split("#", 2);
  const sep = beforeHash.includes("?") ? "&" : "?";
  return `${beforeHash}${sep}${q}${hash ? `#${hash}` : ""}`;
}
