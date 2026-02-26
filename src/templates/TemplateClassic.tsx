import type { TemplateProps } from "@/templates/registry";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { NicheImage } from "@/components/NicheImage";
import { FAQItem } from "@/components/FAQItem";
import { cn } from "@/lib/cn";
import { getServicesForNiche } from "@/lib/servicesCatalog";
import { publicAssetUrl } from "@/lib/publicAssetUrl";
import { LiveGoogleReviews } from "@/components/LiveGoogleReviews";
import { withLeadQuery } from "@/lib/leadSchema";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Award,
} from "lucide-react";

/* ── Accreditation labels ── */
const ACCREDITATION_LABELS: Record<string, string> = {
  gas_safe: "Gas Safe Registered",
  niceic: "NICEIC Approved",
  fmb: "Federation of Master Builders",
  checkatrade: "Checkatrade Verified",
  trustmark: "TrustMark Approved",
  nfrc: "NFRC Member",
  napit: "NAPIT Registered",
  ciphe: "CIPHE Member",
  city_guilds: "City & Guilds Qualified",
  safe_contractor: "SafeContractor Approved",
};

/* ── Generic trust items ── */
const GENERIC_TRUST = [
  "Fully Insured",
  "Free No-Obligation Quotes",
  "5-Star Rated",
  "Local & Reliable",
];

/* ── Fallback reviews ── */
const DEFAULT_REVIEWS = [
  {
    text: "Brilliant work from start to finish. Turned up on time, kept the site tidy, and the quality is outstanding. Would highly recommend to anyone.",
    name: "James T.",
    town: "London",
  },
  {
    text: "Very professional team. They explained everything clearly, gave a fair price, and delivered exactly what was promised. Couldn't be happier.",
    name: "Sarah M.",
    town: "Surrey",
  },
  {
    text: "Called them for an urgent job and they came out the same day. Fantastic service and really friendly. Will definitely use again.",
    name: "David R.",
    town: "Kent",
  },
];

/* ── Generic FAQ builder ── */
function buildFAQs(trade: string, location: string) {
  return [
    {
      q: `How quickly can you start a ${trade.toLowerCase()} job?`,
      a: `Most jobs can be scheduled within a few days. For emergencies in ${location} and surrounding areas, we aim for same-day or next-day response.`,
    },
    {
      q: "Do you provide free quotes?",
      a: "Yes — all our quotes are free and come with no obligation. We'll visit the site, assess what's needed, and give you a clear, written price before any work starts.",
    },
    {
      q: "Are you fully insured?",
      a: "Absolutely. We carry full public liability insurance and our work is guaranteed. You can request to see our certificates at any time.",
    },
    {
      q: `What areas do you cover for ${trade.toLowerCase()} work?`,
      a: `We're based in ${location} and cover the surrounding areas. Contact us to check availability in your area.`,
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept bank transfer, card payments, and cash. Payment terms are agreed before work begins — no surprise charges.",
    },
  ];
}

/* ════════════════════════════════════════════════════════════════
   Template Classic — full-featured layout
   ════════════════════════════════════════════════════════════════ */

export default function TemplateClassic({
  lead,
  config,
  leadQuery,
  previewSection,
}: TemplateProps) {
  const { companyName, location, phone, email, ctaText, emergencyAvailable, primaryColor, secondaryColor } =
    lead;
  const phoneRaw = (phone ?? "").replace(/\D/g, "");
  const phoneDisplay = phoneRaw || phone;
  const compact = Boolean(previewSection);
  const trade = config.tradePlural;
  const niche = config.id;
  const displayName = companyName?.trim() || config.companyName;
  const displayLocation = location?.trim() || "London";
  const reviews = lead.customReviews?.length ? lead.customReviews : DEFAULT_REVIEWS;
  const faqs = buildFAQs(trade, displayLocation);
  const serviceOpts = getServicesForNiche(lead.niche);
  const serviceMap = new Map(serviceOpts.map((o) => [o.id, o.label] as const));
  for (const cs of lead.customServices ?? []) {
    serviceMap.set(cs.id, cs.label);
  }
  const offered = (lead.servicesOffered ?? [])
    .map((id) => ({ id, label: serviceMap.get(id) }))
    .filter((v): v is { id: string; label: string } => Boolean(v.label));

  const branded = (href: string) => withLeadQuery(href, leadQuery);

  const RenderImage = ({
    imageRef,
    alt,
    compactMode,
  }: {
    imageRef: string;
    alt: string;
    compactMode?: boolean;
  }) => {
    const r = (imageRef ?? "").trim();
    if (!r) return null;
    if (r.startsWith("gallery:")) {
      const id = String(r.split(":")[2] ?? "").split("/").pop() ?? "";
      const src = publicAssetUrl(`niches/${niche}/${id}`);
      return (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full rounded-xl border border-slate-200 object-cover",
            compactMode ? "h-24" : "h-40"
          )}
          loading="lazy"
        />
      );
    }
    return (
      <img
        src={r}
        alt={alt}
        className={cn(
          "w-full rounded-xl border border-slate-200 object-cover",
          compactMode ? "h-24" : "h-40"
        )}
        loading="lazy"
      />
    );
  };

  const HeroSection = (
    <section id="hero" className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <NicheImage
            niche={niche}
            src={config.heroImages[0] ?? "hero-1.webp"}
            alt={`${trade} work by ${displayName}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/40" />
        </div>

        <div
          className={cn(
            "relative mx-auto max-w-7xl px-4 sm:px-6",
            compact ? "py-14 sm:py-16" : "py-24 sm:py-32 lg:py-40"
          )}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Copy */}
            <div className="max-w-xl">
              {emergencyAvailable && (
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/90 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur">
                  <AlertTriangle className="h-4 w-4" />
                  24/7 Emergency Service Available
                </div>
              )}

              <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                {displayName}
                <span className="mt-2 block text-lg font-medium text-slate-300 sm:text-xl">
                  Expert {trade} in {displayLocation}
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-200">
                {config.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  as="a"
                  href={branded("#cta")}
                  size="lg"
                  variant="primary"
                >
                  {ctaText}
                </Button>
                {phoneDisplay && phoneRaw && (
                  <Button as="a" href={`tel:${phoneRaw}`} size="lg" variant="white">
                    <Phone className="mr-2 h-5 w-5" />
                    {phoneDisplay}
                  </Button>
                )}
              </div>

              {/* Quick trust points */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Free Quotes
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Fully Insured
                </span>
                {lead.yearsInBusiness != null && lead.yearsInBusiness > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    {lead.yearsInBusiness}+ Years Experience
                  </span>
                )}
              </div>
            </div>

            {/* Contact form placeholder */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
                <h3 className="mb-1 text-xl font-bold text-white">
                  Get Your Free Quote
                </h3>
                <p className="mb-6 text-sm text-slate-300">
                  Fill in your details and we&apos;ll get back to you.
                </p>
                <div className="space-y-4">
                  <div className="h-12 rounded-lg bg-white/20 backdrop-blur" />
                  <div className="h-12 rounded-lg bg-white/20 backdrop-blur" />
                  <div className="h-12 rounded-lg bg-white/20 backdrop-blur" />
                  <div className="h-24 rounded-lg bg-white/20 backdrop-blur" />
                  <Button className="w-full" size="lg" variant="primary">
                    {ctaText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );

  const TrustSection = (() => {
    const acc = (lead.accreditations ?? []).filter(Boolean);
    const labels =
      acc.length > 0
        ? acc.slice(0, 4).map((id) => ACCREDITATION_LABELS[String(id)] ?? String(id))
        : GENERIC_TRUST;
    const icons = [Shield, Clock, Star, Award];
    return (
      <section id="trust" className={cn("bg-white", compact ? "py-8" : "py-12")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {labels.slice(0, 4).map((label, i) => {
              const Icon = icons[i] ?? CheckCircle2;
              return (
                <Reveal key={`${label}-${i}`}>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[var(--c1)]/10 text-[var(--c1)] flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{label}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  })();

  const ServicesSection = (
    <section
      id="services"
      className={cn("bg-slate-50", compact ? "py-10" : "py-20 sm:py-28")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading subtitle="What We Do" center>
            {config.servicesHeading}
          </SectionHeading>
        </Reveal>

        {offered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(compact ? offered.slice(0, 4) : offered).map(({ id, label }) => (
              <Reveal key={id}>
                <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden p-6">
                  <RenderImage
                    imageRef={(lead.serviceImageRefs?.[id] ?? "").trim()}
                    alt={`${label} — ${displayName}`}
                    compactMode={compact}
                  />
                  <h3 className="text-lg font-bold text-slate-900">{label}</h3>
                  <p className="text-slate-600 leading-relaxed mt-2 mb-4">
                    {(lead.serviceDescriptions?.[id] ?? "").trim() ||
                      "Professional, tidy work with clear pricing."}
                  </p>
                  <a
                    href={branded("#cta")}
                    className="inline-flex items-center text-[var(--c1)] font-semibold text-sm group-hover:translate-x-1 transition-transform"
                  >
                    Enquire now <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {config.services.map((svc) => (
              <Reveal key={svc.title}>
                <ServiceCard
                  title={svc.title}
                  description={svc.description}
                  imageNiche={niche}
                  imageFilename={svc.imageFilename}
                  imageAlt={svc.title}
                  href={branded(svc.href ?? "#cta")}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const ReviewsSection = (
    <section
      id="reviews"
      className={cn("bg-slate-50", compact ? "py-10" : "py-20 sm:py-28")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading subtitle="Testimonials" center>
            What Our Customers Say
          </SectionHeading>
        </Reveal>

        {lead.placeId && (lead.upsells ?? []).includes("google_reviews" as any) ? (
          <LiveGoogleReviews
            placeId={lead.placeId}
            fallback={DEFAULT_REVIEWS.map((r) => ({
              author_name: r.name,
              rating: 5,
              text: r.text,
            }))}
          />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 3).map((rev, i) => (
              <Reveal key={i}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                  {/* Stars */}
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-5 w-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-slate-600 leading-relaxed">
                    &ldquo;{rev.text}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--c1)]/10 text-sm font-bold text-[var(--c1)]">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {rev.name}
                      </p>
                      <p className="text-xs text-slate-500">{rev.town}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const ProjectsSection = (
    <section id="projects" className={cn("bg-white", compact ? "py-10" : "py-20 sm:py-28")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading subtitle="Our Work" center>
            Recent Projects
          </SectionHeading>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(lead.recentProjects?.length ? lead.recentProjects : []).length ? (
            lead.recentProjects.slice(0, 3).map((p, i) => (
              <Reveal key={`${p.title}-${i}`}>
                <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-6">
                  <RenderImage
                    imageRef={(p.imageRef ?? "").trim()}
                    alt={p.title}
                    compactMode={compact}
                  />
                  <div className="mt-4 flex items-center gap-2">
                    {p.location ? (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {p.location}
                      </span>
                    ) : null}
                    <span className="rounded-full bg-[var(--c1)]/10 px-3 py-1 text-xs font-semibold text-[var(--c1)]">
                      Recent work
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {p.summary}
                  </p>
                </div>
              </Reveal>
            ))
          ) : (
            config.projects.slice(0, 3).map((proj) => (
              <Reveal key={proj.title}>
                <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <NicheImage
                      niche={niche}
                      src={proj.img}
                      alt={proj.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
                        {proj.loc}
                      </span>
                      <span className="rounded-full bg-[var(--c1)]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        {proj.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900">
                      {proj.title}
                    </h3>
                    <ul className="mt-3 space-y-1">
                      {proj.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );

  if (previewSection) {
    return (
      <div
        className="min-h-screen bg-slate-50 text-slate-900"
        style={{ "--c1": primaryColor, "--c2": secondaryColor } as React.CSSProperties}
      >
        {previewSection === "hero" || previewSection === "brand" ? HeroSection : null}
        {previewSection === "trust" ? TrustSection : null}
        {previewSection === "services" ? ServicesSection : null}
        {previewSection === "reviews" ? ReviewsSection : null}
        {previewSection === "projects" ? ProjectsSection : null}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{ "--c1": primaryColor, "--c2": secondaryColor } as React.CSSProperties}
    >
      {/* ───────── HERO ───────── */}
      {HeroSection}

      {/* ───────── TRUST STRIP ───────── */}
      {TrustSection}

      {/* ───────── SERVICES ───────── */}
      {ServicesSection}

      {lead.aboutText?.trim() ? (
        <section id="about" className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <SectionHeading subtitle="About" center>
                About {displayName}
              </SectionHeading>
            </Reveal>
            <Reveal>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {lead.aboutText}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ───────── PROJECTS ───────── */}
      {ProjectsSection}

      {/* ───────── REVIEWS ───────── */}
      {ReviewsSection}

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading subtitle="FAQ" center>
              Frequently Asked Questions
            </SectionHeading>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.q}
                  question={faq.q}
                  answer={faq.a}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── SERVICE AREAS ───────── */}
      <section id="areas" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading subtitle="Coverage" center>
              Areas We Serve
            </SectionHeading>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              {(lead.serviceAreas.length > 0
                ? lead.serviceAreas
                : [location]
              ).map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm"
                >
                  <MapPin className="h-4 w-4 text-[var(--c1)]" />
                  {area}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
              Don&apos;t see your area? Contact us — we may still be able to
              help.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── BOTTOM CTA ───────── */}
      <section id="cta" className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0">
          <NicheImage
            niche={niche}
            src={config.bottomCtaImage}
            alt={`${displayName} — ${trade}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--c2)]/90 to-[var(--c2)]/75" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-200">
              Contact {displayName} today for a free, no-obligation quote.
              We&apos;re here to help with all your {trade.toLowerCase()} needs
              in {displayLocation}.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                as="a"
                href={branded("#hero")}
                size="lg"
                variant="primary"
              >
                {ctaText}
              </Button>
              {phoneDisplay && phoneRaw && (
                <Button as="a" href={`tel:${phoneRaw}`} size="lg" variant="white">
                  <Phone className="mr-2 h-5 w-5" />
                  {phoneDisplay}
                </Button>
              )}
            </div>
            {email && (
              <p className="mt-6 text-sm text-slate-300">
                <Mail className="mr-1 inline h-4 w-4" />
                {email}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
