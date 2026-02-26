"use client";

import React from "react";
import {
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  HardHat,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react";

import { resolveAsset } from "../lib/branding";
import { useLead } from "../components/LeadProvider";

export function TrustStrip() {
  const { nicheConfig } = useLead();

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "Fully Insured": ShieldCheck,
    "NFRC Member": BadgeCheck,
    "25 Year Guarantee": CheckCircle2,
    "City & Guilds Qualified": Award,
    "SafeContractor Accredited": HardHat,
    "Local Authority Approved": Building2,
    "Federation of Master Builders": ThumbsUp,
    "Transparent pricing": BadgeCheck,
    "Tidy workmanship": CheckCircle2,
    "Clear milestones": Building2,
    "Tidy sites": CheckCircle2,
    "Safety-first": ShieldCheck,
    "Clear written quotes": Award,
    "Trusted local trades": ThumbsUp,
    "Project managed": Building2,
    "Quality workmanship": CheckCircle2,
  };

  const items = nicheConfig.trust.stripItems.map((it) => {
    if (it.kind === "image" && it.imageFilename) {
      return { kind: "image" as const, text: it.text, src: resolveAsset(it.imageFilename), alt: it.text };
    }
    const Icon = iconMap[it.text] ?? BadgeCheck;
    return { kind: "icon" as const, text: it.text, Icon };
  });

  return (
    <div id="trust" className="bg-white border-b border-slate-100 overflow-hidden py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-scroll gap-16 items-center whitespace-nowrap">
            {[...items, ...items].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-[color:var(--c1-soft)] flex items-center justify-center group-hover:bg-[color:var(--c1)] transition-colors duration-300">
                  {item.kind === "icon" ? (
                    <item.Icon className="w-6 h-6 text-[color:var(--c1)] group-hover:text-white transition-colors duration-300" />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
