import type { Metadata } from "next";
import React from "react";

import { LeadFrame } from "../../components/LeadFrame";
import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { stringifySearchParams, type SearchParamsLike } from "../../lib/search-params";

export const metadata: Metadata = {
  title: "Emergency Call-outs | TradesUK",
  description: "Emergency callouts and urgent repairs.",
  alternates: { canonical: "/emergency-call-outs" },
};

export default async function EmergencyCallOutsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsLike> | SearchParamsLike;
}) {
  const sp = searchParams ? await Promise.resolve(searchParams as any) : {};
  const initialQueryString = stringifySearchParams(sp);
  return (
    <LeadFrame initialQueryString={initialQueryString}>
      <main className="font-sans">
        <ServiceDetailTemplate serviceId="emergency-call-outs" />
      </main>
    </LeadFrame>
  );
}

