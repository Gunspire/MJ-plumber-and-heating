"use client";

import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "../../components/PageHero";
import { GhlInlineForm } from "../../components/GhlInlineForm";
import { SectionHeading } from "../../components/SectionHeading";
import { useLead } from "../../components/LeadProvider";
import { Footer } from "../../sections/Footer";

export function ContactPageClient() {
  const { site } = useLead();

  return (
    <main className="font-sans">
      <PageHero
        size="compact"
        images={site.hero.imageRefs}
        kicker="Contact"
        title={`Contact ${site.companyName}`}
        description={
          <p>
            Get a quick response with clear next steps. Tell us what you need and we’ll confirm
            availability in {site.location}.
          </p>
        }
        primaryAction={{ label: site.ctaText, href: "#contact-form" }}
        secondaryAction={{
          label: `Call ${site.phone}`,
          href: `tel:${site.phone.replace(/\s+/g, "")}`,
          variant: "outline",
        }}
      />

      <section className="bg-white py-14 sm:py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Get in touch" center>
            Request a quote
          </SectionHeading>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                <div className="space-y-4 text-slate-700 font-semibold">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[color:var(--c1)]" />
                    <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="hover:underline">
                      {site.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[color:var(--c1)]" />
                    <a href={`mailto:${site.email}`} className="hover:underline">
                      {site.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[color:var(--c1)]" />
                    <span>{site.location}</span>
                  </div>
                </div>
                <div className="mt-5 text-sm text-slate-600 leading-relaxed">
                  Opening hours: <span className="font-semibold text-slate-900">{site.openingHours}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div id="contact-form" className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4">
                <GhlInlineForm
                  iframeSrc="https://api.leadconnectorhq.com/widget/form/pUKKlY5X944tv2QrhEgj"
                  iframeId="inline-pUKKlY5X944tv2QrhEgj-contact"
                  formId="pUKKlY5X944tv2QrhEgj"
                  formName="Form 6"
                  height={879}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

