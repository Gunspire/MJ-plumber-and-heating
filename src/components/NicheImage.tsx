"use client";

import * as React from "react";

export type NicheImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "onError"> & {
  niche: string;
  src: string;
  alt: string;
  onError?: React.ImgHTMLAttributes<HTMLImageElement>["onError"];
};

const FALLBACK_NICHE = "plumber";

export function NicheImage({ niche, src, alt, onError, ...imgProps }: NicheImageProps) {
  const safeNiche = niche?.trim() ? niche.trim() : FALLBACK_NICHE;
  const primarySrc = `https://storage.vfwebdesign.co.uk/public-vfwebdesign/niches/${encodeURIComponent(safeNiche)}/${src}`;
  const fallbackSrc = `https://storage.vfwebdesign.co.uk/public-vfwebdesign/niches/${encodeURIComponent(FALLBACK_NICHE)}/${src}`;
  const [currentSrc, setCurrentSrc] = React.useState(primarySrc);

  React.useEffect(() => {
    setCurrentSrc(primarySrc);
  }, [primarySrc]);

  return (
    <img
      {...imgProps}
      src={currentSrc}
      alt={alt}
      onError={(e) => {
        onError?.(e);
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
