"use client";

import { CheckCircle2, Star } from "lucide-react";

import { PageHero } from "./PageHero";
import { useLead } from "./LeadProvider";

export function ProjectsHero() {
  const { site } = useLead();

  return (
    <PageHero
      size="compact"
      images={site.hero.imageRefs}
      kicker="Recent Projects"
      title="See the finish. See the details. See the difference."
      description={
        <p>
          Browse recent plumbing & heating jobs—from leak repairs to boiler fixes. If you like what you see, request a quote and
          we’ll get back quickly with clear next steps.
        </p>
      }
      primaryAction={{ label: "View projects", href: "#projects" }}
      secondaryAction={{
        label: `Call ${site.phone}`,
        href: `tel:${site.phone.replace(/\D/g, "")}`,
        variant: "outline",
      }}
      highlights={[
        { icon: <Star className="w-4 h-4 text-yellow-400 fill-current" />, text: "Rated 4.9" },
        { icon: <CheckCircle2 className="w-4 h-4 text-white/80" />, text: "Tidy workmanship" },
        { icon: <CheckCircle2 className="w-4 h-4 text-white/80" />, text: "Clear written quotes" },
      ]}
    />
  );
}


