"use client";

import React from "react";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
};

export function LiveGoogleReviews({
  placeId,
  fallback,
}: {
  placeId: string;
  fallback: Review[];
}) {
  const [loading, setLoading] = React.useState(true);
  const [reviews, setReviews] = React.useState<Review[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/google/reviews?placeId=${encodeURIComponent(placeId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        setReviews(Array.isArray(data?.reviews) ? data.reviews : []);
      })
      .catch(() => {
        if (cancelled) return;
        setReviews([]);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [placeId]);

  const final = reviews.length ? reviews.slice(0, 3) : fallback.slice(0, 3);

  return (
    <div>
      {loading ? (
        <p className="text-slate-500 text-sm">Loading Google reviews…</p>
      ) : null}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {final.map((rev, i) => (
          <div
            key={i}
            className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, s) => (
                <span key={s} className="text-amber-400">★</span>
              ))}
            </div>
            <blockquote className="flex-1 text-slate-600 leading-relaxed">
              &ldquo;{rev.text}&rdquo;
            </blockquote>
            <div className="mt-6 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-slate-900">{rev.author_name}</p>
              {rev.relative_time_description ? (
                <p className="text-xs text-slate-500">{rev.relative_time_description}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

