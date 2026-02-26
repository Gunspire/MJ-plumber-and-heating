"use client";

import React from "react";

type Props = {
  widgetId: string;
  src: string;
  resourcesUrl?: string;
};

export function LeadConnectorChatWidget({ widgetId, src, resourcesUrl }: Props) {
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-lc-widget-id="${CSS.escape(widgetId)}"]`
    );
    if (existing) return;

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;

    // Mark it so we can dedupe across HMR/remounts.
    s.setAttribute("data-lc-widget-id", widgetId);

    // LeadConnector loader reads these off currentScript.attributes.
    s.setAttribute("data-widget-id", widgetId);
    if (resourcesUrl) s.setAttribute("data-resources-url", resourcesUrl);

    document.body.appendChild(s);
  }, [widgetId, src, resourcesUrl]);

  return null;
}

