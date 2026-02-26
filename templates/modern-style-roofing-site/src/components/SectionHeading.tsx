import React from "react";

import { cn } from "../lib/cn";

type Props = {
  children: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  className?: string;
};

export function SectionHeading({ children, subtitle, center = false, className }: Props) {
  return (
    <div className={cn("mb-12", center && "text-center", className)}>
      {subtitle && (
        <span className="text-[color:var(--c1)] font-semibold tracking-wider text-sm uppercase mb-2 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{children}</h2>
    </div>
  );
}
