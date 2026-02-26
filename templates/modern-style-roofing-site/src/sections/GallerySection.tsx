"use client";

import React from "react";

import { SectionHeading } from "../components/SectionHeading";
import { cn } from "../lib/cn";
import { useLead } from "../components/LeadProvider";
import { resolveImageRef } from "../lib/branding";

export function GallerySection() {
  const { site } = useLead();
  const tiles = site.projects.items.slice(0, 4).map((p, idx) => ({
    id: String(idx),
    cls: idx === 0 || idx === 3 ? "col-span-7 row-span-3" : "col-span-5 row-span-3",
    src: resolveImageRef(p.imageRef, site.niche) ?? "",
    alt: p.title,
    location: p.location,
  }));

  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <SectionHeading subtitle="Gallery" center>
          Real work. Real results.
        </SectionHeading>

        <div className="hidden md:block">
          <div className="bg-white p-3 lg:p-4 rounded-3xl border border-slate-200 shadow-sm">
            <div className="relative h-[70vh] lg:h-[80vh]">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-3 lg:gap-4">
                {tiles.map((t) => (
                  <div
                    key={t.id}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl",
                       "bg-slate-100 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-[rgb(var(--c1-rgb)/0.35)]",
                      t.cls
                    )}
                  >
                    <img
                      src={t.src}
                      alt={t.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/0 to-slate-900/0 transition-opacity duration-500 group-hover:opacity-75" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-white/80 backdrop-blur px-3 py-1.5 text-xs font-semibold text-slate-900 border border-white/50 shadow-sm transition-all duration-300 group-hover:bg-white/95 group-hover:-translate-y-0.5">
                        {t.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-sm">
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {tiles.map((t) => (
                  <div
                    key={t.id}
                    className="group relative overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 aspect-[4/3] transition-all duration-300 active:scale-[0.99]"
                  >
                    <img
                      src={t.src}
                      alt={t.alt}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/0 to-slate-900/0 transition-opacity duration-500 group-hover:opacity-75" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-full bg-white/80 backdrop-blur px-3 py-1.5 text-xs font-semibold text-slate-900 border border-white/50 shadow-sm transition-all duration-300 group-hover:bg-white/95 group-hover:-translate-y-0.5">
                        {t.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
