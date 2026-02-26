"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { isProbablyExternalHref } from "./branding";
import { useLeadContext } from "./lead-context";

function appendQuery(path: string, query: string) {
  const raw = path.trim();
  if (!raw) return raw;

  const [beforeHash, hash = ""] = raw.split("#", 2);
  const hasQuery = beforeHash.includes("?");
  const joiner = hasQuery ? "&" : "?";
  const next = `${beforeHash}${joiner}${query}${hash ? `#${hash}` : ""}`;
  return next;
}

export function useLeadHref() {
  const pathname = usePathname();
  const { leadQueryString, site } = useLeadContext();

  const withPreviewBase = React.useCallback(
    (path: string) => {
      if (!path.startsWith("/")) return path;
      const niche = (site?.niche ?? "").trim();
      if (!niche) return path;

      const parts = pathname.split("/").filter(Boolean);
      const mainBase = `/${niche}`;
      const demoBase = `/d/${niche}`;

      let activeBase: string | null = null;
      if (parts[0] === "d" && parts[1] === niche) activeBase = demoBase;
      else if (parts[0] === niche) activeBase = mainBase;
      if (!activeBase) return path;

      if (path === "/" || path === "") return activeBase;
      if (
        path === mainBase ||
        path.startsWith(`${mainBase}/`) ||
        path === demoBase ||
        path.startsWith(`${demoBase}/`)
      ) {
        return path;
      }
      return `${activeBase}${path}`;
    },
    [pathname, site?.niche]
  );

  return React.useCallback(
    (path: string) => {
      const raw = (path ?? "").trim();
      if (!raw) return raw;
      if (raw.startsWith("#")) return raw;
      if (isProbablyExternalHref(raw)) return raw;
      const rebased = withPreviewBase(raw);
      if (!leadQueryString) return rebased;
      return appendQuery(rebased, leadQueryString);
    },
    [leadQueryString, withPreviewBase]
  );
}

