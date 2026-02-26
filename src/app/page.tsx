import React from "react";
import Template from "@/templates/modern";
import { lead } from "@/data/lead";
import { getNicheConfig } from "@/lib/niches";
import { toPreviewQuery } from "@/lib/leadSchema";

export default function HomePage() {
  const config = getNicheConfig("plumber");
  const leadQuery = toPreviewQuery(lead);

  return (
    <div
      data-theme="site"
      className="min-h-screen bg-slate-50 font-sans"
      style={{ "--c1": lead.primaryColor, "--c2": lead.secondaryColor } as React.CSSProperties}
    >
      <Template lead={lead} config={config} leadQuery={leadQuery} />
    </div>
  );
}
