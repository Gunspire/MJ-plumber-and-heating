import type { ComponentType } from "react";
import type { TemplateId, LeadPreviewState } from "@/lib/leadSchema";
import type { NicheConfig } from "@/lib/niches";

/** Every template component must accept exactly this shape. */
export type TemplateProps = {
  lead: LeadPreviewState;
  config: NicheConfig;
  /** URL query string (no leading '?') used to keep the template stateless. */
  leadQuery: string;
  /**
   * When present, templates should render ONLY the requested section.
   * Used for live, in-wizard previews (hero/services/reviews).
   */
  previewSection?: "hero" | "brand" | "services" | "reviews" | "trust" | "projects" | "faq" | "areas" | "cta";
};

export type TemplateEntry = {
  id: TemplateId;
  label: string;
  description: string;
  component: ComponentType<TemplateProps>;
};

/*
 * We use dynamic imports so templates are code-split.
 * The registry itself is lightweight — only metadata.
 */
const TEMPLATE_META: Record<TemplateId, Omit<TemplateEntry, "component">> = {
  modern: {
    id: "modern",
    label: "Modern",
    description: "Big, bold images with your phone number right at the top. Great for making a strong first impression.",
  },
  waves: {
    id: "waves",
    label: "Waves",
    description: "A premium multi-page website with separate pages for services, about, gallery, and contact.",
  },
};

/**
 * Map of externally-hosted template IDs → their env var keys.
 * All templates now render locally via their in-repo components.
 * The standalone template projects in /templates/ can still be
 * `npm run dev`'d individually for design iteration.
 */
const EXTERNAL_TEMPLATE_ENV: Partial<Record<TemplateId, { envKey: string; fallback: string }>> = {
  waves: { envKey: "NEXT_PUBLIC_TEMPLATE_WAVES_URL", fallback: "https://waves.vfwebdesign.co.uk" },
  modern: { envKey: "NEXT_PUBLIC_TEMPLATE_MODERN_URL", fallback: "https://modern.vfwebdesign.co.uk" },
};

/**
 * Returns the base URL for an externally-hosted template, or null if the
 * template is rendered locally (inline component).
 */
export function getExternalTemplateUrl(id: TemplateId): string | null {
  const entry = EXTERNAL_TEMPLATE_ENV[id];
  if (!entry) return null;
  return process.env[entry.envKey] || entry.fallback;
}

export function getTemplateMeta(id: TemplateId) {
  return TEMPLATE_META[id] ?? TEMPLATE_META.waves;
}

export function getAllTemplateMeta(): (Omit<TemplateEntry, "component">)[] {
  return Object.values(TEMPLATE_META);
}

/**
 * Dynamically load a template component.
 * Callers should use `React.lazy()` or `next/dynamic` in their page wrappers.
 */
export async function loadTemplate(id: TemplateId): Promise<ComponentType<TemplateProps>> {
  switch (id) {
    case "modern": {
      const mod = await import("./modern");
      return mod.default;
    }
    case "waves": {
      const mod = await import("./waves");
      return mod.default;
    }
    default: {
      const mod = await import("./waves");
      return mod.default;
    }
  }
}
