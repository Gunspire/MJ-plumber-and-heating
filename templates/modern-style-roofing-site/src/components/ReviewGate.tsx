"use client";

import React from "react";
import { Star } from "lucide-react";

import { Button } from "./Button";
import { cn } from "../lib/cn";
import { useLead } from "./LeadProvider";

const DEFAULT_GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=MJ%20plumber%20and%20heating%20reviews";

const GOOGLE_REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? DEFAULT_GOOGLE_REVIEW_URL;

type Step = "pick" | "redirecting" | "feedback" | "thanks";

export type ReviewGateProps = {
  titleAs?: "h1" | "h2" | "h3";
};

export function ReviewGate({ titleAs = "h2" }: ReviewGateProps) {
  const { site } = useLead();
  const feedbackEmail = (site.email ?? "").trim() || "help@mjplumberandheating.co.uk";
  const phoneRaw = (site.phone ?? "").replace(/\D/g, "");
  const phoneDisplay = site.phone;
  const [rating, setRating] = React.useState<number | null>(null);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [step, setStep] = React.useState<Step>("pick");

  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const effectiveRating = hoverRating ?? rating ?? 0;

  React.useEffect(() => {
    if (step !== "redirecting") return;
    const id = window.setTimeout(() => {
      window.location.assign(GOOGLE_REVIEW_URL);
    }, 600);
    return () => window.clearTimeout(id);
  }, [step]);

  const onPickRating = (value: number) => {
    setRating(value);
    setHoverRating(null);
    if (value >= 4) {
      setStep("redirecting");
      return;
    }
    setStep("feedback");
  };

  const reset = () => {
    setRating(null);
    setHoverRating(null);
    setStep("pick");
    setName("");
    setContact("");
    setMessage("");
    setSubmitting(false);
  };

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || rating >= 4) return;

    setSubmitting(true);
    const subject = `Customer feedback (${rating}/5 stars)`;
    const bodyLines = [
      `Rating: ${rating}/5`,
      name.trim() ? `Name: ${name.trim()}` : null,
      contact.trim() ? `Contact: ${contact.trim()}` : null,
      "",
      "Message:",
      message.trim(),
      "",
      "(Sent from the website review page)",
    ].filter(Boolean) as string[];

    const href =
      `mailto:${feedbackEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = href;
    setSubmitting(false);
    setStep("thanks");
  };

  const TitleTag = titleAs;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 sm:px-10 py-10 sm:py-12">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-[color:var(--c1)]">{site.companyName}</p>
            <TitleTag className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              How was your experience?
            </TitleTag>
            <p className="mt-3 text-slate-600">
              Tap a star to rate us. If you’re happy, you’ll be taken to Google to leave a public
              review.
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2" role="radiogroup" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((v) => {
                const isActive = v <= effectiveRating;
                return (
                  <button
                    key={v}
                    type="button"
                    role="radio"
                    aria-checked={rating === v}
                    aria-label={`${v} star${v === 1 ? "" : "s"}`}
                    onMouseEnter={() => setHoverRating(v)}
                    onMouseLeave={() => setHoverRating(null)}
                    onFocus={() => setHoverRating(v)}
                    onBlur={() => setHoverRating(null)}
                    onClick={() => onPickRating(v)}
                    className={cn(
                      "p-2 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--c1)] focus-visible:ring-offset-2",
                      "hover:bg-slate-50"
                    )}
                  >
                    <Star
                      className={cn(
                        "w-10 h-10 sm:w-11 sm:h-11 transition-colors",
                        isActive ? "text-yellow-500 fill-current" : "text-slate-300"
                      )}
                    />
                  </button>
                );
              })}
              <span className="ml-3 text-sm font-semibold text-slate-700 tabular-nums">
                {rating ? `${rating}/5` : "Select"}
              </span>
            </div>

            {step === "redirecting" && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-slate-900 font-bold">Thank you — redirecting to Google…</p>
                <p className="text-slate-600 text-sm mt-1">
                  If you’re not redirected, use the button below.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Button as="a" href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer">
                    Leave a Google review
                  </Button>
                  <Button variant="outline" as="a" href={phoneRaw ? `tel:${phoneRaw}` : `tel:${phoneDisplay}`}>
                    Call us instead
                  </Button>
                </div>
              </div>
            )}

            {step === "feedback" && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-slate-900 font-bold">We’re sorry it wasn’t 5 stars.</p>
                <p className="text-slate-600 text-sm mt-1">
                  Tell us what happened and we’ll make it right.
                </p>

                <form onSubmit={submitFeedback} className="mt-5 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Name (optional)</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">
                        Phone or email (optional)
                      </label>
                      <input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">What went wrong?</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[color:var(--c1)] focus:ring-2 focus:ring-[rgb(var(--c1-rgb)/0.25)] outline-none transition-all resize-none"
                      placeholder="Please share any details so we can fix this quickly…"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Opening email…" : "Send feedback"}
                    </Button>
                    <Button variant="outline" type="button" onClick={reset}>
                      Start over
                    </Button>
                    <Button variant="white" as="a" href={phoneRaw ? `tel:${phoneRaw}` : `tel:${phoneDisplay}`}>
                      Call {phoneDisplay}
                    </Button>
                  </div>

                  <p className="text-xs text-slate-500">
                    This will open your email app and send feedback to{" "}
                    <span className="font-semibold">{feedbackEmail}</span>.
                  </p>
                </form>
              </div>
            )}

            {step === "thanks" && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-slate-900 font-bold">Thank you — we’ve got it.</p>
                <p className="text-slate-600 text-sm mt-1">
                  We’ll review your feedback and follow up if you left contact details.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" type="button" onClick={reset}>
                    Leave another rating
                  </Button>
                  <Button as="a" href={phoneRaw ? `tel:${phoneRaw}` : `tel:${phoneDisplay}`}>
                    Call {phoneDisplay}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 sm:px-10 py-6 bg-slate-900 text-slate-200 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-sm">
            Prefer WhatsApp? Message us for a quick response.
          </p>
          <a
            className="text-sm font-bold text-white hover:text-white/80 transition-colors"
            href={`https://wa.me/${phoneRaw}?text=Hi%20there%20%E2%80%94%20I%27d%20like%20some%20help%20with%20my%20recent%20job.`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp us →
          </a>
        </div>
      </div>
    </div>
  );
}


