"use client";

import React from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { useLead } from "../components/LeadProvider";
import { resolveImageRef } from "../lib/branding";

export function ProjectsSection() {
  const { site } = useLead();

  return (
    <section id="projects" className="py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle={site.projects.subtitle} center>
          {site.projects.heading}
        </SectionHeading>

        <div className="grid md:grid-cols-3 gap-6">
          {site.projects.items.slice(0, 3).map((project, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200 bg-white"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={resolveImageRef(project.imageRef, site.niche) ?? ""}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
              </div>

              <div className="p-6">
                <h4 className="text-slate-900 text-xl font-extrabold leading-snug">
                  {project.title}
                </h4>
                <p className="text-slate-600 font-semibold flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-[color:var(--c1)]" /> {project.location}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[color:var(--c1)]" />
                    <span className="font-semibold">Recent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[color:var(--c1)]" />
                    <span className="font-semibold">—</span>
                  </div>
                </div>

                <div className="mt-4 text-sm font-semibold text-slate-600 leading-relaxed">
                  {project.summary}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button as="a" href="/projects" variant="outline">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
