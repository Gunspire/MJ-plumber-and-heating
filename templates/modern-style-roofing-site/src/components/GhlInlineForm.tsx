"use client";

import React from "react";

type Props = {
  iframeSrc: string;
  iframeId: string;
  formId: string;
  formName: string;
  height?: number;
  className?: string;
};

function ensureGhlFormEmbedScript() {
  if (typeof document === "undefined") return;
  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-ghl-form-embed="true"]'
  );
  if (existing) return;

  const s = document.createElement("script");
  s.src = "https://link.msgsndr.com/js/form_embed.js";
  s.async = true;
  s.defer = true;
  s.setAttribute("data-ghl-form-embed", "true");
  document.body.appendChild(s);
}

export function GhlInlineForm({
  iframeSrc,
  iframeId,
  formId,
  formName,
  height = 879,
  className,
}: Props) {
  React.useEffect(() => {
    ensureGhlFormEmbedScript();
  }, []);

  return (
    <iframe
      src={iframeSrc}
      style={{
        width: "100%",
        height: `${height}px`,
        border: "none",
        borderRadius: "3px",
      }}
      id={iframeId}
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name={formName}
      data-height={String(height)}
      data-layout-iframe-id={iframeId}
      data-form-id={formId}
      title={formName}
      className={className}
    />
  );
}

