import React from "react";

import { FAQItem } from "../components/FAQItem";
import { SectionHeading } from "../components/SectionHeading";

export function FaqSection() {
  return (
    <section id="faq" className="py-20 lg:py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Common Questions" center>
          Frequently Asked Questions
        </SectionHeading>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-2">
          <FAQItem
            question="Do you provide free estimates?"
            answer="Yes, we offer completely free, no-obligation quotes. We'll visit your property to assess the work required and provide a detailed written breakdown."
          />
          <FAQItem
            question="Are you fully insured?"
            answer="Absolutely. We carry £5 million Public Liability Insurance and £10 million Employer's Liability Insurance for your peace of mind."
          />
          <FAQItem
            question="How quickly can you attend?"
            answer="It depends on workload, but urgent issues are prioritised where possible. We’ll give you a clear ETA and next steps when you contact us."
          />
          <FAQItem
            question="Do you offer warranties?"
            answer="Yes — where applicable, we stand by our workmanship. We’ll confirm what’s covered for your specific repair or install before we start."
          />
        </div>
      </div>
    </section>
  );
}
