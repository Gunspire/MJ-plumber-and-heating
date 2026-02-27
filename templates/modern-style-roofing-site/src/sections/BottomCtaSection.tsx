"use client";

import React from "react";
import { Mail, Phone, ShieldCheck } from "lucide-react";

import { GhlInlineForm } from "../components/GhlInlineForm";
import { useLead } from "../components/LeadProvider";
import { resolveImageRef } from "../lib/branding";

export function BottomCtaSection() {
  const { site } = useLead();
  const bg = resolveImageRef(site.hero.imageRefs[0] ?? "", site.niche);

  return (
    <section id="cta" className="relative overflow-hidden py-16 lg:py-20">
      <div className="absolute inset-0">
        {bg ? <img src={bg} alt="" aria-hidden="true" className="h-full w-full object-cover" /> : null}
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--c2-rgb)/0.75)] via-[rgb(var(--c2-rgb)/0.55)] to-[rgb(var(--c2-rgb)/0.35)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 text-white">
            <p className="text-white/80 font-semibold tracking-wider text-sm uppercase mb-3">
              Get in touch
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {site.ctaText} — fast response, no obligation
            </h2>
            <p className="text-white/85 mt-4 text-lg leading-relaxed">
              Tell us what you need and we’ll come back with clear next steps.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <a
                href={`tel:${site.phone.replace(/\D/g, "")}`}
                className="group rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-5 py-4 hover:bg-white/15 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-tight">Call</p>
                    <p className="text-white/85 text-sm mt-1">{site.phone}</p>
                    <p className="text-white/70 text-xs mt-1">{site.openingHours}</p>
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="group rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-5 py-4 hover:bg-white/15 transition sm:col-span-2"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-tight">Email</p>
                    <p className="text-white/85 text-sm mt-1">{site.email}</p>
                    <p className="text-white/70 text-xs mt-1">{site.openingHours}</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3 text-white/85">
              <ShieldCheck className="w-5 h-5 text-white/80" />
              <span className="text-sm">{site.accreditations.slice(0, 3).join(" • ")}</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-white/90 backdrop-blur shadow-2xl overflow-hidden p-3 sm:p-4">
              <GhlInlineForm
                iframeSrc="https://api.leadconnectorhq.com/widget/form/pUKKlY5X944tv2QrhEgj"
                iframeId="inline-pUKKlY5X944tv2QrhEgj-cta"
                formId="pUKKlY5X944tv2QrhEgj"
                formName="Form 6"
                height={879}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

