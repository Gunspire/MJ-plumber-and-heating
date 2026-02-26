"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { Button } from "../components/Button";
import { BrandedLink } from "../components/BrandedLink";
import { Logo } from "../components/Logo";
import { useLead } from "../components/LeadProvider";
import { cn } from "../lib/cn";

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const lead = useLead();
  const { site } = lead;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const servicesRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimerServicesRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (servicesRef.current && !servicesRef.current.contains(target)) setIsServicesOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  React.useEffect(() => {
    // Close the mobile drawer when navigating.
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    // Prevent background scroll while the drawer is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const openServices = () => {
    if (closeTimerServicesRef.current) {
      window.clearTimeout(closeTimerServicesRef.current);
      closeTimerServicesRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const closeServicesSoon = () => {
    if (closeTimerServicesRef.current) window.clearTimeout(closeTimerServicesRef.current);
    closeTimerServicesRef.current = window.setTimeout(() => setIsServicesOpen(false), 180);
  };

  const mainNavItems = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ];

  const servicesItems = [
    {
      label: "All Services",
      href: "/services",
      desc: `Browse our ${lead.nicheConfig.tradeName.toLowerCase()} services`,
    },
    ...site.servicesAll.map((s) => ({
      label: s.label,
      href: `/services/${encodeURIComponent(s.id)}`,
      desc: s.description,
    })),
  ];

  const mobileServicesItems = [
    {
      label: "All Services",
      href: "/services",
      desc: `Browse our ${lead.nicheConfig.tradeName.toLowerCase()} services`,
    },
    ...site.services.items.map((s) => ({
      label: s.label,
      href: `/services/${encodeURIComponent(s.id)}`,
      desc: s.description,
    })),
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-2">
            <BrandedLink href="/" className="flex items-center">
              <Logo className="h-[56px] sm:h-[64px] w-auto" alt={site.companyName} />
              <span className="sr-only">{site.companyName}</span>
            </BrandedLink>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServicesSoon}
            >
              <button
                type="button"
                onClick={() => (isServicesOpen ? setIsServicesOpen(false) : openServices())}
                aria-haspopup="menu"
                aria-expanded={isServicesOpen}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[color:var(--c1)] font-medium transition-colors"
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>

              {isServicesOpen && (
                <div
                  role="menu"
                  className="absolute left-0 mt-2 w-[360px] rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServicesSoon}
                >
                  <div className="p-2">
                    {servicesItems.map((it) => (
                      <BrandedLink
                        key={it.href}
                        href={it.href}
                        role="menuitem"
                        className="block rounded-xl px-4 py-3 hover:bg-slate-50 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="text-sm font-extrabold text-slate-900">{it.label}</div>
                        <div className="text-xs font-semibold text-slate-500 mt-1">{it.desc}</div>
                      </BrandedLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mainNavItems.map((item) => (
              <BrandedLink
                key={item.label}
                href={item.href}
                className="text-slate-600 hover:text-[color:var(--c1)] font-medium transition-colors"
              >
                {item.label}
              </BrandedLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 font-medium">
                {site.emergencyAvailable ? "24/7 Emergency Line" : "Call us"}
              </span>
              <a
                href={`tel:${site.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-lg font-bold text-slate-900 hover:text-[color:var(--c1)] transition-colors"
              >
                <Phone className="w-5 h-5 text-[color:var(--c1)]" />
                {site.phone}
              </a>
            </div>
            <Button as="a" href={onHome ? "#contact" : "/#contact"}>
              {site.ctaText}
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sheet */}
          <div className="fixed left-0 right-0 top-24 z-[70] bg-white border-t border-slate-200 shadow-2xl">
            <div className="max-h-[calc(100vh-6rem)] overflow-y-auto px-4 py-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold text-slate-900">{site.companyName}</div>
                <button
                  type="button"
                  className="p-2 text-slate-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                {mainNavItems.map((item) => (
                  <BrandedLink
                    key={item.label}
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </BrandedLink>
                ))}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left"
                  onClick={() => setIsMobileServicesOpen((v) => !v)}
                  aria-expanded={isMobileServicesOpen}
                >
                  <span className="text-sm font-extrabold text-slate-900">Services</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-slate-500 transition-transform",
                      isMobileServicesOpen ? "rotate-180" : ""
                    )}
                  />
                </button>

                {isMobileServicesOpen ? (
                  <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                    {mobileServicesItems.map((it) => (
                      <BrandedLink
                        key={it.href}
                        href={it.href}
                        className="block px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-white border-b border-slate-200 last:border-b-0"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="font-extrabold">{it.label}</div>
                        <div className="mt-0.5 text-xs font-semibold text-slate-500">{it.desc}</div>
                      </BrandedLink>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-5 grid gap-3">
                <a
                  href={`tel:${site.phone.replace(/\D/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-extrabold text-slate-900"
                >
                  <Phone className="w-5 h-5 text-[color:var(--c1)]" />
                  {site.phone}
                </a>
                <Button
                  as="a"
                  href={onHome ? "#contact" : "/#contact"}
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {site.ctaText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
