"use client";

import React from "react";
import { BadgeCheck, Star } from "lucide-react";

import { SectionHeading } from "../components/SectionHeading";
import { useLead } from "../components/LeadProvider";

const GOOGLE_LOGO_URL = "https://storage.vfwebdesign.co.uk/public-vfwebdesign/niches/google-g.png";

export function ReviewsSection() {
  const { site } = useLead();

  return (
    <section id="reviews" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle={site.reviews.subtitle} center>
          {site.reviews.heading}
        </SectionHeading>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                  <img src={GOOGLE_LOGO_URL} alt="Google" className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold text-slate-900 leading-none">4.9</span>
                    <div className="flex items-center text-yellow-500">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-slate-600">average on Google</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    <span className="font-semibold text-slate-900">120+ verified Google reviews</span>
                    {" "}from customers across {site.location} and surrounding areas.
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm">
                <BadgeCheck className="w-4 h-4 text-[color:var(--c1)]" />
                Verified Google Reviews
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {site.reviews.items.slice(0, 3).map((review, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[color:var(--c1-soft)] rounded-full flex items-center justify-center text-[color:var(--c1)] font-bold">
                    {(review.name ?? "?")[0]}
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm leading-tight">{review.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <BadgeCheck className="w-4 h-4 text-[color:var(--c1)]" />
                      <span className="text-xs font-semibold text-slate-600">Verified Google review</span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5">
                  <img src={GOOGLE_LOGO_URL} alt="Google" className="w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-700">Google</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500">Recently</span>
              </div>

              <p className="text-slate-700 mt-4 leading-relaxed">“{review.text}”</p>

              <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-600">{review.town}</span>
                <span>Posted on Google</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
