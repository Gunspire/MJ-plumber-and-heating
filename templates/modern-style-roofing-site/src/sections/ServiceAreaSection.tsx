"use client";

import React from "react";

import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { useLead } from "../components/LeadProvider";

export function ServiceAreaSection() {
  const { site } = useLead();

  return (
    <section id="areas" className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading subtitle="Service Area">
              {site.location} & surrounding areas
            </SectionHeading>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We typically cover{" "}
              <span className="font-semibold text-slate-900">
                {site.serviceAreas.slice(0, 4).join(", ")}
              </span>
              {" "}and nearby areas. If you’re unsure, get in touch and we’ll confirm availability.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: "Nearby",
                  items: site.serviceAreas.slice(0, Math.max(2, Math.ceil(site.serviceAreas.length / 2))),
                },
                {
                  title: "More areas",
                  items: site.serviceAreas.slice(Math.max(2, Math.ceil(site.serviceAreas.length / 2))),
                },
              ].map((block) => (
                <div
                  key={block.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <p className="font-bold text-slate-900">{block.title}</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {block.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--c1)]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button as="a" href="#contact">
                {site.ctaText}
              </Button>
              <Button variant="outline" as="a" href={`tel:${site.phone.replace(/\s+/g, "")}`}>
                Call {site.phone}
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
              <div className="aspect-square relative">
                <iframe
                  title={`Service area map (${site.location})`}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(site.location)}&z=9&output=embed`}
                />

                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[rgb(var(--c1-rgb)/0.80)] bg-[rgb(var(--c1-rgb)/0.10)] shadow-[0_0_0_8px_rgb(var(--c1-rgb)/0.10)]"
                  style={{ width: "72%", height: "72%" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
