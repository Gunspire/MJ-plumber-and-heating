"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "./Button";
import { useLead } from "./LeadProvider";

const GHL_ENTERPRISE_RECAPTCHA_SITE_KEY = "6LeDBFwpAAAAAJe8ux9-imrqZ2ueRsEtdiWoDDpX";

declare global {
  // eslint-disable-next-line no-var
  var grecaptchaV3: any | undefined;
  // eslint-disable-next-line no-var
  var __ghlRecaptchaLoading: Promise<void> | undefined;
}

async function ensureGhlRecaptchaV3(siteKey: string) {
  if (typeof window === "undefined") return;
  if (window.grecaptchaV3?.enterprise?.execute) return;
  if (window.__ghlRecaptchaLoading) return window.__ghlRecaptchaLoading;

  window.__ghlRecaptchaLoading = new Promise<void>((resolve) => {
    const finish = () => {
      window.grecaptchaV3 = (window as any).grecaptcha;
      resolve();
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="https://www.google.com/recaptcha/enterprise.js?render="]`
    );
    if (existing) {
      // If it already loaded earlier (common in dev/HMR), there's no "load" event to wait for.
      if ((window as any).grecaptcha?.enterprise?.execute) {
        finish();
        return;
      }

      existing.addEventListener("load", () => {
        finish();
      });
      existing.addEventListener("error", () => resolve());
      window.setTimeout(() => resolve(), 6000);
      return;
    }

    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      finish();
    };
    s.onerror = () => resolve();
    document.head.appendChild(s);
    window.setTimeout(() => resolve(), 6000);
  });

  return window.__ghlRecaptchaLoading;
}

async function getCaptchaV3Token(siteKey: string, action: string) {
  await ensureGhlRecaptchaV3(siteKey);
  const gre = window.grecaptchaV3;
  if (!gre) return "";
  if (!gre?.enterprise?.ready || !gre?.enterprise?.execute) return "";
  return await new Promise<string>((resolve) => {
    const timeout = window.setTimeout(() => resolve(""), 6000);
    try {
      gre.enterprise.ready(async () => {
        try {
          const token = await gre.enterprise.execute(siteKey, { action });
          window.clearTimeout(timeout);
          resolve(typeof token === "string" ? token : "");
        } catch {
          window.clearTimeout(timeout);
          resolve("");
        }
      });
    } catch {
      window.clearTimeout(timeout);
      resolve("");
    }
  });
}

export function QuoteFormCard({ id }: { id?: string }) {
  const { site } = useLead();
  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = React.useState<string>("");

  const [fullName, setFullName] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [serviceNeeded, setServiceNeeded] = React.useState<string>(() => site.servicesAll?.[0]?.label ?? "");
  const [details, setDetails] = React.useState("");

  React.useEffect(() => {
    // keep selection valid if services load/change
    if (!serviceNeeded && site.servicesAll?.length) setServiceNeeded(site.servicesAll[0].label);
    if (serviceNeeded && site.servicesAll?.some((s) => s.label === serviceNeeded)) return;
    if (site.servicesAll?.length) setServiceNeeded(site.servicesAll[0].label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [site.servicesAll]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFormStatus("submitting");

    const captchaV3 = await getCaptchaV3Token(GHL_ENTERPRISE_RECAPTCHA_SITE_KEY, "LEADGEN_FORM_SUBMIT");
    if (!captchaV3) {
      setFormStatus("idle");
      const host = typeof window !== "undefined" ? window.location.hostname : "";
      const isLocalhost =
        host === "localhost" ||
        host === "127.0.0.1" ||
        host === "0.0.0.0" ||
        host.endsWith(".local");

      const hasGrecaptcha = !!(window as any).grecaptcha;
      if (!hasGrecaptcha) {
        setError(
          "Verification was blocked (reCAPTCHA didn’t load). Disable any ad/script blockers and try again."
        );
        return;
      }

      if (isLocalhost) {
        setError(
          "Verification can fail on localhost. Test this form on your live domain (or we can switch this form to a GHL webhook so it works everywhere)."
        );
        return;
      }

      setError("Could not verify you. Please refresh and try again.");
      return;
    }

    try {
      const res = await fetch("/api/ghl-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          address,
          postcode,
          serviceNeeded,
          details,
          captchaV3,
        }),
      });

      const json = (await res.json().catch(() => null)) as any;
      if (!res.ok || !json?.ok) {
        setFormStatus("idle");
        setError(json?.error || "Something went wrong. Please try again.");
        return;
      }

      setFormStatus("success");
    } catch {
      setFormStatus("idle");
      setError("Network error. Please try again.");
    }
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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Postcode</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all"
                  placeholder="SW1A 1AA"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Address</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all"
                placeholder="House number + street"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Service Needed</label>
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all bg-white"
                value={serviceNeeded}
                onChange={(e) => setServiceNeeded(e.target.value)}
              >
                {site.servicesAll.map((s) => (
                  <option key={s.id} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Details</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all resize-none"
                placeholder="Briefly describe what you need..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                {error}
              </div>
            ) : null}

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

