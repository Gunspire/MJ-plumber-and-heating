"use client";

import React from "react";

import { ServiceCard } from "../components/ServiceCard";
import { SectionHeading } from "../components/SectionHeading";
import { useLead } from "../components/LeadProvider";

export function ServicesSection() {
  const { site } = useLead();

  return (
    <section id="services" className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading subtitle={site.services.subtitle} center>
        {site.services.heading}
      </SectionHeading>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {site.services.items.map((s) => (
          <ServiceCard
            key={s.id}
            title={s.label}
            description={s.description}
            imageSrc={s.imageRef}
            imageAlt={s.label}
            href={`/services/${encodeURIComponent(s.id)}`}
            linkLabel="Learn more"
          />
        ))}
      </div>
    </section>
  );
}
