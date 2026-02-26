"use client";

import React from "react";

import { ProjectsHero } from "../../components/ProjectsHero";
import { ProjectsGallery, type ProjectGalleryItem } from "../../components/ProjectsGallery";
import { SectionHeading } from "../../components/SectionHeading";
import { useLead } from "../../components/LeadProvider";
import { resolveImageRef } from "../../lib/branding";
import { ReviewsSection } from "../../sections/ReviewsSection";
import { BottomCtaSection } from "../../sections/BottomCtaSection";
import { Footer } from "../../sections/Footer";

export function ProjectsPageClient() {
  const { site, nicheConfig } = useLead();

  const items: ProjectGalleryItem[] = site.projects.items.map((p) => ({
    src: resolveImageRef(p.imageRef, site.niche) ?? "",
    alt: p.title,
    title: p.title,
    location: p.location,
    date: "Recent",
    duration: "—",
    tags: [nicheConfig.tradeName, site.location],
  }));

  return (
    <main className="font-sans">
      <ProjectsHero />

      <section id="projects" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Portfolio" center>
            Recent projects
          </SectionHeading>

          <ProjectsGallery items={items} />
        </div>
      </section>

      <ReviewsSection />
      <BottomCtaSection />
      <Footer />
    </main>
  );
}

