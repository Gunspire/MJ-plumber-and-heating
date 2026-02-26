import type { Metadata } from "next";
import React from "react";

import { LeadFrame } from "../../components/LeadFrame";
import { ReviewsPageClient } from "./reviews-client";
import { stringifySearchParams, type SearchParamsLike } from "../../lib/search-params";

export const metadata: Metadata = {
  title: "Reviews | TradesUK",
  description: "Read genuine customer reviews and leave feedback.",
  alternates: { canonical: "/reviews" },
};

const GOOGLE_REVIEWS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ??
  "https://www.google.com/search?q=TradesUK%20reviews";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsLike> | SearchParamsLike;
}) {
  const sp = searchParams ? await Promise.resolve(searchParams as any) : {};
  const initialQueryString = stringifySearchParams(sp);
  return (
    <LeadFrame initialQueryString={initialQueryString}>
      <ReviewsPageClient googleReviewsUrl={GOOGLE_REVIEWS_URL} />
    </LeadFrame>
  );
}

