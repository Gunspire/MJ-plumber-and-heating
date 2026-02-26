import type { Metadata } from "next";
import React from "react";

import { LeadFrame } from "../../components/LeadFrame";
import { ProjectsPageClient } from "./projects-client";
import { stringifySearchParams, type SearchParamsLike } from "../../lib/search-params";

export const metadata: Metadata = {
  title: "Projects | TradesUK",
  description: "Explore recent projects and completed work.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsLike> | SearchParamsLike;
}) {
  const sp = searchParams ? await Promise.resolve(searchParams as any) : {};
  const initialQueryString = stringifySearchParams(sp);
  return (
    <LeadFrame initialQueryString={initialQueryString}>
      <ProjectsPageClient />
    </LeadFrame>
  );
}

