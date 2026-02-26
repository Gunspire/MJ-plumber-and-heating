"use client";

import React from "react";

import { Button } from "../components/Button";
import { useLead } from "../components/LeadProvider";
import { resolveImageRef } from "../lib/branding";

export function CtaBand() {
  const { site, nicheConfig } = useLead();
  const bg = resolveImageRef(site.hero.imageRefs[1] ?? site.hero.imageRefs[0] ?? "", site.niche);

  return (
    <section className="relative overflow-hidden py-10 lg:py-12">
      <div className="absolute inset-0">
        {bg ? <img src={bg} alt="" aria-hidden="true" className="h-full w-full object-cover" /> : null}
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--c2-rgb)/0.75)] via-[rgb(var(--c2-rgb)/0.55)] to-[rgb(var(--c2-rgb)/0.35)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Need a {nicheConfig.tradeName} company you can trust?
        </h2>
        <p className="text-white/85 text-base md:text-lg mb-6 max-w-2xl mx-auto">
          Get clear next steps and a tidy, professional finish. Tell us what you need and we’ll respond quickly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="white" size="md" as="a" href="#contact">
            {site.ctaText}
          </Button>
          <Button
            variant="outline"
            size="md"
            className="border-white text-white hover:bg-white/10"
            as="a"
            href={`tel:${site.phone.replace(/\D/g, "")}`}
          >
            Call {site.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
