"use client";

import React from "react";
import { CheckCircle2, Clock, MapPin, Star } from "lucide-react";

import { Button } from "../components/Button";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { SectionHeading } from "../components/SectionHeading";
import { useLead } from "../components/LeadProvider";
import { resolveImageRef } from "../lib/branding";

export function BeforeAfterSection() {
  const { site } = useLead();
  const before = resolveImageRef("before.webp", site.niche) ?? "";
  const after = resolveImageRef("after.webp", site.niche) ?? "";

  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading subtitle="Transformation">
              Before → After
            </SectionHeading>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              A clear before/after helps homeowners understand the finish quality. This example shows a tidy,
              professional result with careful attention to detail.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-slate-700 font-medium">
                  Clear scope and tidy workmanship
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-slate-700 font-medium">
                  Clean finish and respectful work areas
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-slate-700 font-medium">
                  Clear next steps and fast communication
                </span>
              </li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[color:var(--c1-soft)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[color:var(--c1)]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Location</p>
                  <p className="text-sm font-bold text-slate-900">{site.location}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[color:var(--c1-soft)] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[color:var(--c1)]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Turnaround</p>
                  <p className="text-sm font-bold text-slate-900">Fast</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button as="a" href="#contact">
                {site.ctaText}
              </Button>
              <Button variant="outline" as="a" href={`tel:${site.phone.replace(/\D/g, "")}`}>
                Call {site.phone}
              </Button>
            </div>
          </div>

          <div className="relative">
            <BeforeAfterSlider beforeImage={before} afterImage={after} />
            <p className="text-center text-sm text-slate-500 mt-4 italic">
              Drag the slider to see the transformation
            </p>

            <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500">Completed last week</span>
              </div>
              <p className="text-slate-700 leading-relaxed italic">
                “Great communication and a really tidy finish. You can see the difference straight away.”
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 bg-[color:var(--c1-soft)] rounded-full flex items-center justify-center text-[color:var(--c1)] font-bold">
                  H
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">Helen P.</p>
                  <p className="text-slate-500 text-xs">{site.location} • Recent job</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
