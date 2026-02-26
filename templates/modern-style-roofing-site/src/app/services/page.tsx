import type { Metadata } from "next";
import React from "react";

import { LeadFrame } from "../../components/LeadFrame";
import { SectionHeading } from "../../components/SectionHeading";
import { ServicesSection } from "../../sections/ServicesSection";
import { BottomCtaSection } from "../../sections/BottomCtaSection";
import { Footer } from "../../sections/Footer";
import { stringifySearchParams, type SearchParamsLike } from "../../lib/search-params";

export const metadata: Metadata = {
  title: "Services | TradesUK",
  description: "Browse our services and request a quote.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParamsLike> | SearchParamsLike;
}) {
  const sp = searchParams ? await Promise.resolve(searchParams as any) : {};
  const initialQueryString = stringifySearchParams(sp);
  return (
    <LeadFrame initialQueryString={initialQueryString}>
      <main className="font-sans">
        <section className="bg-white py-14 sm:py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="Services" center>
              Browse services
            </SectionHeading>
          </div>
        </section>
        <ServicesSection />
        <BottomCtaSection />
        <Footer />
      </main>
    </LeadFrame>
  );
}

