import React from "react";

import { stringifySearchParams, type SearchParamsLike } from "../lib/search-params";
import { ModernTemplate } from "../vf-template/Template";
import { getDefaultModernTemplateProps } from "../vf-template/defaults";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsLike> | SearchParamsLike;
}) {
  const sp = searchParams ? await Promise.resolve(searchParams as any) : {};
  const initialQueryString = stringifySearchParams(sp);
  const defaults = getDefaultModernTemplateProps();

  return (
    <ModernTemplate lead={defaults.lead} config={defaults.config} leadQuery={initialQueryString} />
  );
}
