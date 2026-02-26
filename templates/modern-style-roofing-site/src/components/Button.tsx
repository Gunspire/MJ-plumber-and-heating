"use client";

import React from "react";
import Link from "next/link";

import { cn } from "../lib/cn";
import { isProbablyExternalHref } from "../lib/branding";
import { useLeadHref } from "../lib/lead-href";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonAsAnchorProps = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", as, ...props }, ref) => {
    const leadHref = useLeadHref();
    const variants = {
      primary:
        "bg-[color:var(--c1)] text-white hover:bg-[color:var(--c1-hover)] shadow-lg shadow-[rgb(var(--c1-rgb)/0.20)]",
      secondary: "bg-[color:var(--c2)] text-white hover:bg-[color:var(--c2-hover)]",
      outline:
        "border-2 border-[color:var(--c1)] text-[color:var(--c1)] hover:bg-[rgb(var(--c1-rgb)/0.10)]",
      white:
        "bg-white text-[color:var(--c2)] hover:bg-[rgb(var(--c1-rgb)/0.08)] shadow-md",
    };
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg font-semibold",
    };

    const baseClass = cn(
      "inline-flex items-center justify-center rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
      variants[variant],
      sizes[size],
      className
    );

    if (as === "a") {
      const { href, ...anchorProps } =
        props as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

      const isExternal = isProbablyExternalHref(href);
      const brandedHref = isExternal ? href : leadHref(href);

      if (isExternal) {
        return <a href={brandedHref} className={baseClass} {...anchorProps} />;
      }

      return <Link href={brandedHref} className={baseClass} {...anchorProps} />;
    }

    return (
      <button
        ref={ref}
        className={baseClass}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);

Button.displayName = "Button";
