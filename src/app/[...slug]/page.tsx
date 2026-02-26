import React from "react";
import Template from "@/templates/modern";
import { lead } from "@/data/lead";
import { getNicheConfig } from "@/lib/niches";
import { toPreviewQuery } from "@/lib/leadSchema";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

function normalisePath(parts: string[] | undefined): string {
  return (parts ?? [])
    .filter(Boolean)
    .map((p) => p.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
}

export default async function SubPage({ params }: PageProps) {
  const { slug } = await params;
  const pathSuffix = normalisePath(slug);
  const leadQuery = toPreviewQuery(lead);
  const config = getNicheConfig("plumber");

  const pageKey = pathSuffix.toLowerCase();
  const previewSection =
    pageKey === "services" || pageKey.startsWith("services/")
      ? "services"
      : pageKey === "reviews" || pageKey.startsWith("reviews/")
        ? "reviews"
        : pageKey === "projects" || pageKey.startsWith("projects/")
          ? "projects"
          : pageKey === "faq" || pageKey.startsWith("faq/")
            ? "faq"
            : pageKey === "areas" || pageKey.startsWith("areas/")
              ? "areas"
              : pageKey === "about" || pageKey.startsWith("about/")
                ? "trust"
                : pageKey === "contact" || pageKey.startsWith("contact/")
                  ? "cta"
          : undefined;

  return (
    <div
      data-theme="site"
      className="min-h-screen bg-slate-50 font-sans"
      style={{ "--c1": lead.primaryColor, "--c2": lead.secondaryColor } as React.CSSProperties}
    >
      <Template
        lead={lead}
        config={config}
        leadQuery={leadQuery}
        previewSection={previewSection}
      />
    </div>
  );
}
