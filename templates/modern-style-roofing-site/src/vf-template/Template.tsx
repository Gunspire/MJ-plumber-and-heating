"use client";

import { usePathname } from "next/navigation";
import { AppChrome } from "../components/AppChrome";
import { ContactPageClient } from "../app/contact/contact-client";
import { AboutPageClient } from "../app/about/about-client";
import { ProjectsPageClient } from "../app/projects/projects-client";
import { ReviewsPageClient } from "../app/reviews/reviews-client";
import { ServiceDetailTemplate } from "../components/ServiceDetailTemplate";
import { SectionHeading } from "../components/SectionHeading";
import { HomePageRenderer } from "../components/home-page-renderer";
import { LeadProviderFromQuery } from "../components/LeadProvider";
import { BottomCtaSection } from "../sections/BottomCtaSection";
import { Footer } from "../sections/Footer";
import { ServicesSection } from "../sections/ServicesSection";
import { getDefaultModernTemplateProps } from "./defaults";

export type PreviewSection =
  | "hero"
  | "brand"
  | "services"
  | "projects"
  | "reviews"
  | "trust"
  | "faq"
  | "areas"
  | "cta";

export type TemplateLead = {
  templateId: string;
  niche: string;
  companyName: string;
  location: string;
  phone: string;
  email: string;
  contactMethod: string;
  ctaText: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  logoUrl?: string;
  teamPhotoUrl?: string;
  yearsInBusiness?: number;
  openingHours?: string;
  aboutText?: string;
  accreditations: string[];
  servicesOffered: string[];
  customServices: { id: string; label: string }[];
  serviceDescriptions: Record<string, string>;
  serviceImageRefs: Record<string, string>;
  recentProjects: { title: string; location?: string; summary: string; imageRef?: string }[];
  customReviews: { text: string; name: string; town: string }[];
  serviceAreas: string[];
  emergencyAvailable: boolean;
  showPricing: boolean;
  aboutFacts: { familyRun: boolean; local: boolean; established: boolean };
  upsells: string[];
  placeId?: string;
  lat?: number;
  lng?: number;
  googleMapsUrl?: string;
};

export type TemplateConfig = {
  id: string;
  tradeSingular: string;
  tradePlural: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImages: string[];
  bottomCtaImage: string;
  servicesHeading: string;
  services: Array<{ title: string; description: string; imageFilename: string }>;
  projects: Array<{
    title: string;
    img: string;
    summary?: string;
    loc?: string;
    date?: string;
    duration?: string;
    highlights?: string[];
    alt?: string;
  }>;
};

export type TemplateProps = {
  lead: TemplateLead;
  config: TemplateConfig;
  leadQuery: string;
  previewSection?: PreviewSection;
};

function toB64UrlUtf8(value: string) {
  try {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  } catch {
    return "";
  }
}

function toB64UrlJson(value: unknown) {
  try {
    return toB64UrlUtf8(JSON.stringify(value));
  } catch {
    return "";
  }
}

function toPreviewQuery(lead: TemplateLead): string {
  const qs = new URLSearchParams();
  if (lead.templateId) qs.set("t", lead.templateId);
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
  if (lead.ctaText) qs.set("ctat", lead.ctaText);
  if (lead.emergencyAvailable) qs.set("emg", "1");
  if (lead.showPricing) qs.set("price", "1");
  if (lead.yearsInBusiness != null) qs.set("yrs", String(lead.yearsInBusiness));
  if (lead.openingHours) qs.set("hrs", lead.openingHours);
  if (lead.aboutText) {
    const encoded = toB64UrlUtf8(String(lead.aboutText).slice(0, 2000));
    if (encoded) qs.set("abt", encoded);
  }
  if (lead.teamPhotoUrl) qs.set("tph", lead.teamPhotoUrl);
  if (lead.accreditations.length > 0) qs.set("acc", lead.accreditations.join(","));
  if (lead.servicesOffered.length > 0) qs.set("svc", lead.servicesOffered.join(","));
  if (lead.customServices.length > 0) {
    const encoded = toB64UrlJson(lead.customServices.slice(0, 10).map((svc) => [svc.id, svc.label]));
    if (encoded) qs.set("cs", encoded);
  }
  if (Object.keys(lead.serviceDescriptions).length > 0) {
    const encoded = toB64UrlJson(Object.entries(lead.serviceDescriptions).slice(0, 20));
    if (encoded) qs.set("sd", encoded);
  }
  if (Object.keys(lead.serviceImageRefs).length > 0) {
    const encoded = toB64UrlJson(Object.entries(lead.serviceImageRefs).slice(0, 20));
    if (encoded) qs.set("si", encoded);
  }
  if (lead.recentProjects.length > 0) {
    const encoded = toB64UrlJson(
      lead.recentProjects.slice(0, 3).map((project) => [
        project.title,
        project.location ?? "",
        project.summary,
        project.imageRef ?? "",
      ])
    );
    if (encoded) qs.set("pr", encoded);
  }
  if (lead.customReviews.length > 0) {
    const encoded = toB64UrlJson(lead.customReviews.slice(0, 3).map((r) => [r.text, r.name, r.town]));
    if (encoded) qs.set("rev", encoded);
  }
  if (lead.serviceAreas.length > 0) qs.set("areas", lead.serviceAreas.join(","));
  if (lead.upsells.length > 0) qs.set("up", lead.upsells.join(","));
  if (lead.placeId) qs.set("pid", lead.placeId);
  if (lead.lat != null) qs.set("lat", String(lead.lat));
  if (lead.lng != null) qs.set("lng", String(lead.lng));
  if (lead.googleMapsUrl) qs.set("gmu", lead.googleMapsUrl);
  if (lead.aboutFacts.familyRun || lead.aboutFacts.local || lead.aboutFacts.established) {
    qs.set(
      "f",
      `${lead.aboutFacts.familyRun ? "1" : "0"}${lead.aboutFacts.local ? "1" : "0"}${lead.aboutFacts.established ? "1" : "0"}`
    );
  }
  return qs.toString();
}

function withPreviewSection(query: string, previewSection?: PreviewSection) {
  const base = (query ?? "").replace(/^\?/, "").trim();
  if (!previewSection) return base;
  const sp = new URLSearchParams(base);
  sp.set("sec", previewSection);
  return sp.toString();
}

const GOOGLE_REVIEWS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ??
  "https://www.google.com/search?q=TradesUK%20reviews";

function normalizeRoutePath(pathname: string, niche: string) {
  const cleanPath = (pathname ?? "/").split("?", 1)[0] || "/";
  const parts = cleanPath.split("/").filter(Boolean);
  const safeNiche = (niche ?? "").trim();
  let tail = parts;

  if (safeNiche) {
    if (parts[0] === "d" && parts[1] === safeNiche) tail = parts.slice(2);
    else if (parts[0] === safeNiche) tail = parts.slice(1);
  }

  return tail.length > 0 ? `/${tail.join("/")}` : "/";
}

function decodePathSegment(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function ServicesPageContent() {
  return (
    <main className="font-sans">
      <section className="bg-white py-14 sm:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Services" center>
            Browse services
          </SectionHeading>
        </div>
      </section>
      <ServicesSection />
      <BottomCtaSection />
      <Footer />
    </main>
  );
}

function ModernRouteRenderer({ routePath }: { routePath: string }) {
  const normalized = routePath === "/" ? "/" : routePath.replace(/\/+$/, "") || "/";

  if (normalized === "/about") return <AboutPageClient />;
  if (normalized === "/projects") return <ProjectsPageClient />;
  if (normalized === "/reviews") return <ReviewsPageClient googleReviewsUrl={GOOGLE_REVIEWS_URL} />;
  if (normalized === "/contact") return <ContactPageClient />;
  if (normalized === "/services") return <ServicesPageContent />;

  if (normalized.startsWith("/services/")) {
    const serviceId = decodePathSegment(normalized.slice("/services/".length)).trim();
    if (serviceId) {
      return (
        <main className="font-sans">
          <ServiceDetailTemplate serviceId={serviceId} />
        </main>
      );
    }
  }

  const rootSlug = normalized.startsWith("/") ? normalized.slice(1) : normalized;
  if (
    rootSlug &&
    !rootSlug.includes("/") &&
    rootSlug !== "about" &&
    rootSlug !== "projects" &&
    rootSlug !== "reviews" &&
    rootSlug !== "contact" &&
    rootSlug !== "services"
  ) {
    const serviceId = decodePathSegment(rootSlug).trim();
    if (serviceId) {
      return (
        <main className="font-sans">
          <ServiceDetailTemplate serviceId={serviceId} />
        </main>
      );
    }
  }

  return <HomePageRenderer />;
}

export function ModernTemplate({ lead, leadQuery, previewSection }: TemplateProps) {
  const pathname = usePathname() || "/";
  const routePath = normalizeRoutePath(pathname, lead.niche);
  const baseQuery = (leadQuery ?? "").replace(/^\?/, "").trim() || toPreviewQuery(lead);
  const effectiveQuery = withPreviewSection(baseQuery, previewSection);

  return (
    <LeadProviderFromQuery queryString={effectiveQuery} pathname={routePath}>
      <div data-theme="site">
        <AppChrome>
          <ModernRouteRenderer routePath={routePath} />
        </AppChrome>
      </div>
    </LeadProviderFromQuery>
  );
}

export { getDefaultModernTemplateProps };
export default ModernTemplate;
