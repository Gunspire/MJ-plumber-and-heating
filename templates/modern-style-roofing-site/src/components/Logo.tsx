 "use client";

import React from "react";

import { cn } from "../lib/cn";
import { useLead } from "./LeadProvider";

type LogoProps = {
  className?: string;
  alt?: string;
  variant?: "default" | "inverse";
};

export function Logo({ className, alt = "MJ plumber and heating", variant = "default" }: LogoProps) {
  const { site } = useLead();
  const initial = site.logoUrl ?? null;
  const [src, setSrc] = React.useState<string | null>(initial);
  const [failed, setFailed] = React.useState(false);

  if (!src || failed) {
    return (
      <span
        className={cn(
          "text-slate-900 font-extrabold tracking-tight",
          variant === "inverse" ? "text-white" : undefined,
          className
        )}
        aria-label={alt}
      >
        {site.companyName}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "h-9 w-auto",
        variant === "inverse" ? "brightness-0 invert" : undefined,
        className
      )}
      loading="eager"
      decoding="async"
      onError={() => {
        setSrc(null);
        setFailed(true);
      }}
    />
  );
}


