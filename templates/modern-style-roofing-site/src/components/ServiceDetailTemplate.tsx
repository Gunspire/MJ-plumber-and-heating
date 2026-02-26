"use client";

import React from "react";
import { CheckCircle2, Phone, ShieldCheck } from "lucide-react";

import { PageHero } from "./PageHero";
import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { FAQItem } from "./FAQItem";
import { useLead } from "./LeadProvider";
import { resolveImageRef } from "../lib/branding";
import { getServiceDetailCopy } from "../lib/service-detail-copy";
import { ReviewsSection } from "../sections/ReviewsSection";
import { Footer } from "../sections/Footer";
import { BottomCtaSection } from "../sections/BottomCtaSection";

export function ServiceDetailTemplate({ serviceId }: { serviceId: string }) {
  const { site, nicheConfig } = useLead();
  const service =
    site.servicesAll.find((s) => s.id === serviceId) ??
    site.servicesAll[0] ??
    site.services.items[0];

  const phoneTel = `tel:${site.phone.replace(/\D/g, "")}`;
  const bg = resolveImageRef(service?.imageRef ?? "", site.niche) ?? undefined;
  const detail = getServiceDetailCopy({
    niche: site.niche,
    tradeName: nicheConfig.tradeName,
    companyName: site.companyName,
    location: site.location,
    serviceId: service?.id ?? serviceId,
    serviceLabel: service?.label ?? "Service",
  });

  return (
    <>
      <PageHero
        size="compact"
        images={bg ? [bg] : site.hero.imageRefs}
        // No service “tag”/kicker pill on service pages.
        title={detail.heroTitle}
        description={
          <div className="space-y-3">
            <p>{detail.heroIntro}</p>
            <p className="text-white/80">{service?.description ?? ""}</p>
          </div>
        }
        primaryAction={{ label: site.ctaText, href: "/#contact" }}
        secondaryAction={{ label: `Call ${site.phone}`, href: phoneTel, variant: "outline" }}
        highlights={[
          { icon: <ShieldCheck className="w-4 h-4 text-white/80" />, text: "Fully insured" },
          { icon: <CheckCircle2 className="w-4 h-4 text-white/80" />, text: "Clear pricing" },
          { icon: <CheckCircle2 className="w-4 h-4 text-white/80" />, text: "Tidy workmanship" },
        ]}
      />

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <SectionHeading subtitle={detail.includedSubtitle}>
                {detail.includedTitle}
              </SectionHeading>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
                {detail.includedIntro}
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {detail.includedCards.map((c) => (
                  <div key={c.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-extrabold text-slate-900">{c.title}</div>
                    <p className="mt-1 text-sm font-semibold text-slate-600 leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button as="a" href="/#contact">
                  {site.ctaText}
                </Button>
                <Button as="a" href={phoneTel} variant="outline">
                  <Phone className="w-5 h-5 mr-2" />
                  Call {site.phone}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-100 overflow-hidden shadow-sm">
                <img
                  src={bg ?? resolveImageRef(site.hero.imageRefs[0] ?? "", site.niche) ?? ""}
                  alt={`${service?.label ?? "Service"} example`}
                  className="w-full h-[420px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="text-sm font-extrabold text-slate-900">Fast response</div>
                  <div className="mt-1 text-sm font-semibold text-slate-600">
                    We prioritise urgent issues and keep you updated.
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="text-sm font-extrabold text-slate-900">Trusted locally</div>
                  <div className="mt-1 text-sm font-semibold text-slate-600">
                    Great reviews and repeat customers.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <SectionHeading subtitle={detail.processSubtitle}>{detail.processTitle}</SectionHeading>
              <p className="text-base font-semibold text-slate-600 leading-relaxed max-w-xl">
                {detail.processIntro}
              </p>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <ol className="space-y-4">
                  {detail.processSteps.map((s, idx) => (
                    <li key={s.title}>
                      <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="absolute top-4 right-4 h-8 w-8 rounded-xl bg-[color:var(--c1)] text-white flex items-center justify-center font-extrabold">
                          {idx + 1}
                        </div>
                        <div className="text-sm font-extrabold text-slate-900">{s.title}</div>
                        <p className="mt-2 text-sm font-semibold text-slate-600 leading-relaxed">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeading subtitle={detail.faqSubtitle}>{detail.faqTitle}</SectionHeading>
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm px-6">
                  {detail.faqs.map((f) => (
                    <FAQItem key={f.q} question={f.q} answer={f.a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
      <BottomCtaSection />
      <Footer />
    </>
  );
}

