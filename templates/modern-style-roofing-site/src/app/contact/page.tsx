import type { Metadata } from "next";
import React from "react";

import { LeadFrame } from "../../components/LeadFrame";
import { ContactPageClient } from "./contact-client";
import { stringifySearchParams, type SearchParamsLike } from "../../lib/search-params";

export const metadata: Metadata = {
  title: "Contact | TradesUK",
  description: "Contact us for a quote or to check availability.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsLike> | SearchParamsLike;
}) {
  const sp = searchParams ? await Promise.resolve(searchParams as any) : {};
  const initialQueryString = stringifySearchParams(sp);
  return (
    <LeadFrame initialQueryString={initialQueryString}>
      <ContactPageClient />
    </LeadFrame>
  );
}

