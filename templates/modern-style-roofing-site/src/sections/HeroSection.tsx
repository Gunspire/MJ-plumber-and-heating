"use client";

import React from "react";
import { BadgeCheck, Star } from "lucide-react";

import { Button } from "../components/Button";
import { GhlInlineForm } from "../components/GhlInlineForm";
import { cn } from "../lib/cn";
import { resolveImageRef } from "../lib/branding";
import { useLead } from "../components/LeadProvider";

export function HeroSection() {
  const { site } = useLead();
  const heroImages = site.hero.imageRefs
    .map((r) => resolveImageRef(r, site.niche))
    .filter(Boolean) as string[];
  const [heroImageIndex, setHeroImageIndex] = React.useState(0);

  React.useEffect(() => {
    if (heroImages.length <= 1) return;
    const id = window.setInterval(() => {
      setHeroImageIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [heroImages.length]);

  return (
    <section id="hero" className="relative pt-12 pb-20 lg:pt-24 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
              idx === heroImageIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-slate-900/50 bg-gradient-to-r from-slate-900/70 to-slate-900/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 bg-[rgb(var(--c1-rgb)/0.22)] border border-[rgb(var(--c1-rgb)/0.35)] rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <BadgeCheck className="w-4 h-4 text-[rgb(var(--c1-rgb)/0.85)]" />
              <span className="text-white/90 text-sm font-medium">{site.hero.badge}</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {site.hero.title}
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              {site.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" as="a" href="#contact">
                {site.ctaText}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900"
                as="a"
                href="#projects"
              >
                View Our Work
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-700/50">
              <div className="flex flex-col max-w-[200px]">
                <p className="text-slate-200 italic text-sm mb-2">
                  {"Best plumber I’ve ever used. Quick, clean and professional."}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[color:var(--c1)] rounded-full flex items-center justify-center text-xs font-bold text-white">
                    J
                  </div>
                  <span className="text-slate-400 text-xs font-bold">James D.</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div className="flex flex-col">
                <div className="flex text-yellow-400 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-slate-300 text-sm">4.9/5 from 120+ reviews</span>
              </div>
            </div>
          </div>

          <div
            id="contact"
            className="lg:col-span-4 transform hover:scale-[1.01] transition-transform duration-300"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4">
              <GhlInlineForm
                iframeSrc="https://api.leadconnectorhq.com/widget/form/pUKKlY5X944tv2QrhEgj"
                iframeId="inline-pUKKlY5X944tv2QrhEgj-hero"
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
