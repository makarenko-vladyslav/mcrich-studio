"use client";
import { useState } from "react";
import { useLocale } from "@/lib/i18n";

interface TestimonialItem {
  author: string;
  role: string;
  location: string;
  quote: string;
  metric: string;
  date: string;
  industry: string;
}

export default function Testimonials() {
  const { t } = useLocale();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const kicker = t("testimonials.kicker") as string;
  const title = t("testimonials.title") as string;
  const subtitle = t("testimonials.subtitle") as string;
  const plainRating = t("testimonials.plainRating") as string;
  const items = (t("testimonials.items") as TestimonialItem[]) || [];

  return (
    <section className="bg-bg-light py-20 sm:py-24 border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layer: Kicker + Heading + Subtitle + Plain Text Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-2">
              {kicker}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
              {title}
            </h2>
            <p className="text-text-muted mt-3 text-base sm:text-lg leading-relaxed">
              {subtitle}
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-accent uppercase tracking-wide border-t md:border-t-0 md:border-l border-border-light pt-2 md:pt-0 md:pl-6 shrink-0">
            {plainRating}
          </div>
        </div>

        {/* Numbered Editorial Log Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {items.map((rev, idx) => (
            <div
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`bg-bg-card p-7 sm:p-8 rounded border transition-all duration-200 shadow-sm flex flex-col justify-between cursor-pointer ${
                activeSlide === idx
                  ? "border-accent ring-1 ring-accent"
                  : "border-border-light hover:border-text-dim"
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-border-light pb-3 mb-4">
                  <span className="text-xs font-mono font-bold text-accent">
                    {rev.metric}
                  </span>
                  <span className="text-xs font-mono text-text-dim">
                    REFERANSE 0{idx + 1}
                  </span>
                </div>

                <div className="font-display text-3xl text-accent/30 font-bold leading-none mb-1">
                  «
                </div>
                <blockquote className="text-sm sm:text-base text-text-main leading-relaxed italic mb-6">
                  {rev.quote}
                </blockquote>
              </div>

              <div className="pt-4 border-t border-border-light">
                <div className="font-display text-base font-bold text-primary">
                  {rev.author}
                </div>
                <div className="text-xs text-text-muted">
                  {rev.role}
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-text-dim mt-2 pt-2 border-t border-border-light/60">
                  <span>{rev.location}</span>
                  <span>{rev.industry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx ? "w-8 bg-accent" : "w-2 bg-border-light"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
