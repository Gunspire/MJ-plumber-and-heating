"use client";

import React from "react";
import { BadgeCheck } from "lucide-react";

import { Button } from "./Button";
import { cn } from "../lib/cn";
import { resolveImageRef } from "../lib/branding";
import { useLead } from "./LeadProvider";

export type PageHeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "white";
  target?: string;
  rel?: string;
};

export type PageHeroHighlight = {
  icon: React.ReactNode;
  text: string;
};

export type PageHeroProps = {
  id?: string;
  size?: "compact" | "full";
  images: string[];
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: PageHeroAction;
  secondaryAction?: PageHeroAction;
  highlights?: PageHeroHighlight[];
  className?: string;
};

export function PageHero({
  id,
  size = "compact",
  images,
  kicker,
  title,
  description,
  primaryAction,
  secondaryAction,
  highlights,
  className,
}: PageHeroProps) {
  const { site } = useLead();
  const [heroImageIndex, setHeroImageIndex] = React.useState(0);
  const resolvedImages = React.useMemo(() => {
    const out = images
      .map((img) => resolveImageRef(img, site.niche))
      .filter(Boolean) as string[];
    return out.length > 0 ? out : images;
  }, [images, site.niche]);

  React.useEffect(() => {
    if (resolvedImages.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setHeroImageIndex((i) => (i + 1) % resolvedImages.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [resolvedImages]);

  const isCompact = size === "compact";
  const hasKicker = Boolean((kicker ?? "").trim());

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        isCompact ? "pt-10 pb-12 lg:pt-14 lg:pb-14" : "pt-12 pb-20 lg:pt-24 lg:pb-24",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        {resolvedImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
              idx === heroImageIndex ? "opacity-100" : "opacity-0"
            )}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
        <div className="absolute inset-0 bg-slate-900/50 bg-gradient-to-r from-slate-900/70 to-slate-900/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("max-w-3xl", isCompact ? "" : "lg:max-w-[52rem]")}>
          {hasKicker ? (
            <div className="inline-flex items-center gap-2 bg-[rgb(var(--c1-rgb)/0.22)] border border-[rgb(var(--c1-rgb)/0.35)] rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <BadgeCheck className="w-4 h-4 text-[rgb(var(--c1-rgb)/0.85)]" />
              <span className="text-white/90 text-sm font-medium">{kicker}</span>
            </div>
          ) : null}

          <h1 className={cn("font-bold text-white leading-tight", isCompact ? "text-3xl sm:text-4xl" : "text-3xl lg:text-5xl")}>
            {title}
          </h1>

          {description ? (
            <div className={cn("text-slate-300 leading-relaxed", isCompact ? "mt-4 text-lg" : "mt-6 text-lg")}>
              {description}
            </div>
          ) : null}

          {(primaryAction || secondaryAction) && (
            <div className={cn("flex flex-col sm:flex-row gap-4", isCompact ? "mt-8" : "mt-8 mb-10")}>
              {primaryAction ? (
                <Button
                  size={isCompact ? "md" : "lg"}
                  as="a"
                  href={primaryAction.href}
                  variant={primaryAction.variant ?? "primary"}
                  target={primaryAction.target}
                  rel={primaryAction.rel}
                >
                  {primaryAction.label}
                </Button>
              ) : null}
              {secondaryAction ? (
                <Button
                  as="a"
                  href={secondaryAction.href}
                  variant={secondaryAction.variant ?? "outline"}
                  size={isCompact ? "md" : "lg"}
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                  target={secondaryAction.target}
                  rel={secondaryAction.rel}
                >
                  {secondaryAction.label}
                </Button>
              ) : null}
            </div>
          )}

          {highlights && highlights.length > 0 ? (
            <div
              className={cn(
                "flex flex-wrap items-center gap-4 text-sm font-semibold text-white/90",
                isCompact ? "mt-10" : "pt-8 border-t border-slate-700/50"
              )}
            >
              {highlights.map((h) => (
                <span key={h.text} className="inline-flex items-center gap-2">
                  {h.icon}
                  {h.text}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

