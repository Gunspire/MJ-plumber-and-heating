"use client";

import React from "react";
import { Clock, MapPin, Phone } from "lucide-react";

import { BrandedLink } from "../components/BrandedLink";
import { Logo } from "../components/Logo";
import { useLead } from "../components/LeadProvider";

export function Footer() {
  const { site } = useLead();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo variant="inverse" className="h-[56px] sm:h-[64px] w-auto" alt={site.companyName} />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {site.companyName} provides plumbing & heating across {site.location} and surrounding areas.
              Fast response, clear communication, and tidy work.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {site.services.items.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <BrandedLink
                    href={`/services/${encodeURIComponent(s.id)}`}
                    className="hover:text-[rgb(var(--c1-rgb)/0.90)] transition-colors"
                  >
                    {s.label}
                  </BrandedLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {site.location}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />{" "}
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[rgb(var(--c1-rgb)/0.90)] transition-colors"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {site.openingHours}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Accreditations</h4>
            <div className="flex gap-4">
              {site.accreditations.slice(0, 2).map((a) => (
                <div
                  key={a}
                  className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center text-[10px] font-extrabold text-slate-300 text-center px-1"
                >
                  {a.split(" ").slice(0, 2).join(" ")}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} {site.companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <BrandedLink href="/reviews#leave-review" className="hover:text-white">
              Leave a Review
            </BrandedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
