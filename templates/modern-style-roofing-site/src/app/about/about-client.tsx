"use client";

import React from "react";
import { BadgeCheck, Building2, MapPin, ShieldCheck, Star } from "lucide-react";

import { PageHero } from "../../components/PageHero";
import { SectionHeading } from "../../components/SectionHeading";
import { useLead } from "../../components/LeadProvider";
import { ReviewsSection } from "../../sections/ReviewsSection";
import { BottomCtaSection } from "../../sections/BottomCtaSection";
import { Footer } from "../../sections/Footer";

export function AboutPageClient() {
  const { site } = useLead();

  const facts = [
    { on: site.about.facts.familyRun, label: "Family run", icon: BadgeCheck },
    { on: site.about.facts.local, label: "Local & reliable", icon: MapPin },
    { on: site.about.facts.established, label: "Established", icon: Building2 },
  ].filter((f) => f.on);

  return (
    <main className="font-sans">
      <PageHero
        size="compact"
        images={site.hero.imageRefs}
        kicker="About"
        title={`About ${site.companyName}`}
        description={<p>{site.about.text}</p>}
        primaryAction={{ label: site.ctaText, href: "/#contact" }}
        secondaryAction={{ label: "View projects", href: "/projects", variant: "outline" }}
        highlights={[
          { icon: <Star className="w-4 h-4 text-yellow-400 fill-current" />, text: "4.9 average" },
          { icon: <ShieldCheck className="w-4 h-4 text-white/80" />, text: "Fully insured" },
          { icon: <BadgeCheck className="w-4 h-4 text-white/80" />, text: "Clear written quotes" },
        ]}
      />

      <section className="bg-white py-14 sm:py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="What you can expect" center>
            A simple, professional process
          </SectionHeading>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { t: "Clear scope", d: "You’ll understand what’s included and what’s next." },
              { t: "Tidy workmanship", d: "Respect for your home with clean finishes." },
              { t: "Good communication", d: "Fast replies and straightforward advice." },
            ].map((c) => (
              <div key={c.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                <div className="text-slate-900 font-extrabold">{c.t}</div>
                <div className="mt-2 text-slate-600 font-semibold leading-relaxed">{c.d}</div>
              </div>
            ))}
          </div>

          {facts.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm"
                >
                  <f.icon className="w-4 h-4 text-[color:var(--c1)]" />
                  {f.label}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <ReviewsSection />
      <BottomCtaSection />
      <Footer />
    </main>
  );
}

