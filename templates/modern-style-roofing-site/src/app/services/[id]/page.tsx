import type { Metadata } from "next";
import React from "react";

import { LeadFrame } from "../../../components/LeadFrame";
import { ServiceDetailTemplate } from "../../../components/ServiceDetailTemplate";
import { stringifySearchParams, type SearchParamsLike } from "../../../lib/search-params";

export const metadata: Metadata = {
  title: "Service | TradesUK",
  description: "Service details.",
};

export default async function ServiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }> | { id: string };
  searchParams?: Promise<SearchParamsLike> | SearchParamsLike;
}) {
  const p = params ? await Promise.resolve(params as any) : { id: "" };
  const sp = searchParams ? await Promise.resolve(searchParams as any) : {};
  const initialQueryString = stringifySearchParams(sp);
  return (
    <LeadFrame initialQueryString={initialQueryString}>
      <main className="font-sans">
        <ServiceDetailTemplate serviceId={p.id} />
      </main>
    </LeadFrame>
  );
}

