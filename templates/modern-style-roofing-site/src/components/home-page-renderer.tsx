"use client";

import React, { useEffect } from "react";

import { Reveal } from "./Reveal";
import { useLeadContext } from "../lib/lead-context";
import { BeforeAfterSection } from "../sections/BeforeAfterSection";
import { BottomCtaSection } from "../sections/BottomCtaSection";
import { CtaBand } from "../sections/CtaBand";
import { FaqSection } from "../sections/FaqSection";
import { Footer } from "../sections/Footer";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { ReviewsSection } from "../sections/ReviewsSection";
import { ServiceAreaSection } from "../sections/ServiceAreaSection";
import { ServicesSection } from "../sections/ServicesSection";
import { TrustStrip } from "../sections/TrustStrip";
import { WhyChooseUs } from "../sections/WhyChooseUs";

const SECTION_MAP = {
  hero: <HeroSection />,
  brand: <HeroSection />,
  services: <ServicesSection />,
  projects: <ProjectsSection />,
  reviews: <ReviewsSection />,
  trust: <TrustStrip />,
  faq: <FaqSection />,
  areas: <ServiceAreaSection />,
  cta: <BottomCtaSection />,
} as const;

const TRACKED_SECTIONS = ["hero", "trust", "services", "projects", "reviews", "faq", "areas", "cta"]

export function HomePageRenderer() {
  const { previewSection } = useLeadContext();

  useEffect(() => {
    if (previewSection) return
    let lastId = ""
    let raf = 0
    const scroller = (document.scrollingElement ?? document.documentElement) as unknown as HTMLElement
    let intervalId: number | null = null
    const post = (id: string) => {
      if (!id || id === lastId) return
      lastId = id
      try { window.parent.postMessage({ type: "vf:section", id }, "*") } catch {}
    }
    const compute = () => {
      raf = 0
      const anchorY = window.innerHeight * 0.33
      let active: string | null = null

      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= anchorY && r.bottom >= anchorY) active = id
      }

      if (!active) {
        for (const id of TRACKED_SECTIONS) {
          const el = document.getElementById(id)
          if (!el) continue
          const r = el.getBoundingClientRect()
          if (r.bottom > window.innerHeight * 0.2 && r.top < window.innerHeight * 0.8) {
            active = id
            break
          }
        }
      }

      if (active) post(active)
    }
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(compute)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("scroll", onScroll, { passive: true, capture: true })
    scroller.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    const timeout = window.setTimeout(compute, 350)
    intervalId = window.setInterval(compute, 500)
    return () => {
      window.clearTimeout(timeout)
      if (intervalId) window.clearInterval(intervalId)
      window.removeEventListener("scroll", onScroll as any)
      document.removeEventListener("scroll", onScroll as any, true as any)
      scroller.removeEventListener("scroll", onScroll as any)
      window.removeEventListener("resize", onScroll as any)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [previewSection])

  if (previewSection && previewSection in SECTION_MAP) {
    return SECTION_MAP[previewSection];
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <HeroSection />
      <Reveal>
        <TrustStrip />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <ServicesSection />
      </Reveal>
      <Reveal>
        <BeforeAfterSection />
      </Reveal>
      <Reveal>
        <ProjectsSection />
      </Reveal>
      <Reveal>
        <ReviewsSection />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
      <Reveal>
        <CtaBand />
      </Reveal>
      <Reveal>
        <ServiceAreaSection />
      </Reveal>
      <Reveal>
        <BottomCtaSection />
      </Reveal>
      <Reveal>
        <Footer />
      </Reveal>
    </div>
  );
}

