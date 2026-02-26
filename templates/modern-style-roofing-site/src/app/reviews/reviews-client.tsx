"use client";

import React from "react";
import { BadgeCheck, ShieldCheck, Star } from "lucide-react";

import { Button } from "../../components/Button";
import { PageHero } from "../../components/PageHero";
import { ReviewGate } from "../../components/ReviewGate";
import { SectionHeading } from "../../components/SectionHeading";
import { useLead } from "../../components/LeadProvider";
import { ReviewsSection } from "../../sections/ReviewsSection";
import { TrustStrip } from "../../sections/TrustStrip";
import { BottomCtaSection } from "../../sections/BottomCtaSection";
import { Footer } from "../../sections/Footer";

const GOOGLE_LOGO_URL = "https://storage.vfwebdesign.co.uk/public-vfwebdesign/niches/google-g.png";

export function ReviewsPageClient({ googleReviewsUrl }: { googleReviewsUrl: string }) {
  const { site, nicheConfig } = useLead();

  return (
    <main className="font-sans">
      <PageHero
        size="compact"
        images={site.hero.imageRefs}
        kicker="Reviews & testimonials"
        title={`Trusted local ${nicheConfig.tradeName.toLowerCase()} — proven by real customers`}
        description={
          <p>
            We build trust the old‑fashioned way: show up, communicate clearly, do tidy work, and
            stand behind it. Here’s what customers say across trusted platforms.
          </p>
        }
        primaryAction={{
          label: "View Google reviews",
          href: googleReviewsUrl,
          target: "_blank",
          rel: "noreferrer",
        }}
        secondaryAction={{ label: "Leave a review", href: "#leave-review", variant: "outline" }}
        highlights={[
          { icon: <Star className="w-4 h-4 text-yellow-400 fill-current" />, text: "4.9 average" },
          { icon: <BadgeCheck className="w-4 h-4 text-white/80" />, text: "Verified customers" },
          { icon: <ShieldCheck className="w-4 h-4 text-white/80" />, text: "Fully insured" },
        ]}
      />

      <TrustStrip />

      <section className="bg-white py-14 sm:py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Trust signals" center>
            Reviewed on the platforms customers actually use
          </SectionHeading>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-7">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <img src={GOOGLE_LOGO_URL} alt="Google" className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-extrabold">Google</div>
                    <div className="text-sm text-slate-600 font-semibold">Verified reviews</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-slate-900">4.9</div>
                  <div className="flex justify-end items-center gap-0.5 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Most customers find us on Google Maps. Recent 5★ reviews help new homeowners choose
                confidently.
              </p>
              <div className="mt-5">
                <Button as="a" href={googleReviewsUrl} target="_blank" rel="noreferrer" size="sm">
                  Open Google reviews
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-7">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <img src="/trustpilot.png" alt="Trustpilot" className="w-7 h-7 object-contain" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-extrabold">Trustpilot</div>
                    <div className="text-sm text-slate-600 font-semibold">Independent platform</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-slate-900">Excellent</div>
                  <div className="text-xs font-semibold text-slate-500">Trusted marketplace</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Customers check independent platforms to compare firms. We focus on consistent
                workmanship and clear communication.
              </p>
              <div className="mt-5">
                <Button
                  as="a"
                  href="https://www.trustpilot.com/"
                  target="_blank"
                  rel="noreferrer"
                  size="sm"
                  variant="outline"
                >
                  Trustpilot
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-7">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <span className="text-xs font-extrabold text-slate-700">CHECKA</span>
                  </div>
                  <div>
                    <div className="text-slate-900 font-extrabold">Checkatrade</div>
                    <div className="text-sm text-slate-600 font-semibold">Trade directory</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-slate-900">Trusted</div>
                  <div className="text-xs font-semibold text-slate-500">Local recommendations</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Many customers want vetted tradespeople and written feedback. We’re happy to provide
                references on request.
              </p>
              <div className="mt-5">
                <Button
                  as="a"
                  href="https://www.checkatrade.com/"
                  target="_blank"
                  rel="noreferrer"
                  size="sm"
                  variant="outline"
                >
                  Checkatrade
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-slate-900 font-extrabold text-xl">Want to leave feedback?</div>
                <div className="mt-2 text-slate-600 font-semibold">
                  Pick a star rating — happy customers go to Google, otherwise it stays private.
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button as="a" href="#leave-review">
                  Leave a review
                </Button>
                <Button as="a" href="/#contact" variant="white">
                  {site.ctaText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="leave-review" className="bg-slate-50 py-14 sm:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Leave a review" center>
            Quick star rating (public or private)
          </SectionHeading>
          <div className="mt-8">
            <ReviewGate titleAs="h3" />
          </div>
        </div>
      </section>

      <ReviewsSection />
      <BottomCtaSection />
      <Footer />
    </main>
  );
}

