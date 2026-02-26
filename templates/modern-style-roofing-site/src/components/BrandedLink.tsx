"use client";

import React from "react";
import Link, { type LinkProps } from "next/link";

import { isProbablyExternalHref } from "../lib/branding";
import { useLeadHref } from "../lib/lead-href";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: LinkProps["prefetch"];
};

export function BrandedLink({ href, prefetch, ...props }: Props) {
  const leadHref = useLeadHref();
  const isExternal = isProbablyExternalHref(href) || href.startsWith("#");
  const nextHref = isExternal ? href : leadHref(href);

  if (isProbablyExternalHref(href) || href.startsWith("#")) {
    return <a href={nextHref} {...props} />;
  }

  return <Link href={nextHref} prefetch={prefetch} {...props} />;
}

