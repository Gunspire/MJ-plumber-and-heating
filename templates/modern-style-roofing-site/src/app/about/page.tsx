import type { Metadata } from "next";
import React from "react";

import { LeadFrame } from "../../components/LeadFrame";
import { AboutPageClient } from "./about-client";
import { stringifySearchParams, type SearchParamsLike } from "../../lib/search-params";

export const metadata: Metadata = {
  title: "About | TradesUK",
  description: "About our trade business and approach to quality work.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsLike> | SearchParamsLike;
}) {
  const sp = searchParams ? await Promise.resolve(searchParams as any) : {};
  const initialQueryString = stringifySearchParams(sp);
  return (
    <LeadFrame initialQueryString={initialQueryString}>
      <AboutPageClient />
    </LeadFrame>
  );
}

