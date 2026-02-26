"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "./Button";
import { useLead } from "./LeadProvider";

export function QuoteFormCard({ id }: { id?: string }) {
  const { site } = useLead();
  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    window.setTimeout(() => setFormStatus("success"), 1200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8" id={id}>
      {formStatus === "success" ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Request sent</h3>
          <p className="text-slate-600">{"We'll be in touch shortly to confirm details."}</p>
          <Button variant="outline" className="mt-6" onClick={() => setFormStatus("idle")}>
            Send another
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900">{site.ctaText}</h3>
            <p className="text-slate-500 mt-1">Fast response. No obligation.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Postcode</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all"
                  placeholder="SW1A 1AA"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all"
                placeholder="Your phone number"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Service Needed</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all bg-white">
                {site.servicesAll.map((s) => (
                  <option key={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Details</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all resize-none"
                placeholder="Briefly describe what you need..."
              />
            </div>

            <Button type="submit" className="w-full text-lg" disabled={formStatus === "submitting"}>
              {formStatus === "submitting" ? "Sending..." : site.ctaText}
            </Button>

            <p className="text-xs text-center text-slate-400 mt-4">
              Your data is secure. We never share your details.
            </p>
          </form>
        </>
      )}
    </div>
  );
}

