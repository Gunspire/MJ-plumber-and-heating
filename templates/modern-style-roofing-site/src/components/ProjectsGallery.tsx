"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";

import { cn } from "../lib/cn";

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  tags: string[];
};

export function ProjectsGallery({ items }: { items: ProjectGalleryItem[] }) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const visibleItems = React.useMemo(() => items.slice(0, 6), [items]);

  const isOpen = activeIndex !== null;
  const active = isOpen ? visibleItems[activeIndex] : null;

  const goPrev = React.useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return i;
      return (i - 1 + visibleItems.length) % visibleItems.length;
    });
  }, [visibleItems.length]);

  const goNext = React.useCallback(() => {
    setActiveIndex((i) => {
      if (i === null) return i;
      return (i + 1) % visibleItems.length;
    });
  }, [visibleItems.length]);

  React.useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, goPrev, goNext]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map((p, idx) => (
          <button
            key={`${p.src}-${idx}`}
            type="button"
            className="group text-left rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.35)]"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Open project: ${p.title}`}
          >
            <div className="relative aspect-[4/3] w-full bg-slate-100">
              <img
                src={p.src}
                alt={p.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-slate-900 font-extrabold leading-snug">{p.title}</div>
                  <div className="mt-1 inline-flex items-center gap-2 text-slate-600 text-sm font-semibold">
                    <MapPin className="w-4 h-4 text-[color:var(--c1)]" />
                    {p.location}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <div className="text-xs font-bold text-slate-700">{p.date}</div>
                  <div className="text-xs font-semibold text-slate-500">{p.duration}</div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && active && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
          onMouseDown={(e) => {
            // click outside closes (only if background itself)
            if (e.target === e.currentTarget) setActiveIndex(null);
          }}
        >
          <div className="h-full w-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl">
              <button
                type="button"
                className="absolute -top-3 -right-3 z-10 rounded-full bg-white text-slate-900 shadow-lg border border-slate-200 p-2 hover:bg-slate-50"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                <div className="relative">
                  <img
                    src={active.src}
                    alt={active.alt}
                    className="w-full max-h-[78vh] object-contain bg-slate-950"
                    loading="eager"
                    decoding="async"
                  />

                  <button
                    type="button"
                    className={cn(
                      "absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 text-slate-900 border border-white/30 shadow-lg p-2 hover:bg-white",
                      "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.35)]"
                    )}
                    onClick={goPrev}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 text-slate-900 border border-white/30 shadow-lg p-2 hover:bg-white",
                      "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.35)]"
                    )}
                    onClick={goNext}
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-5 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <div className="text-slate-900 font-extrabold">{active.title}</div>
                      <div className="mt-1 text-sm font-semibold text-slate-600">
                        {active.location} • {active.date} • {active.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {active.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 text-xs font-semibold text-slate-500">
                    Tip: use ←/→ keys to navigate, Esc to close.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


