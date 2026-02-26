"use client";

import React from "react";

import { cn } from "../lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /**
   * Starts the animation a bit before the section fully enters.
   * Example: "0px 0px -15% 0px"
   */
  rootMargin?: string;
};

export function Reveal({ children, className, rootMargin = "0px 0px -12% 0px" }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already visible (e.g. returning to scroll position), show immediately.
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      data-reveal
      data-state={shown ? "shown" : "hidden"}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}
