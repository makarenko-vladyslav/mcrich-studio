"use client";
import { useLocale } from "@/lib/i18n";

export default function SocialProof() {
  const { t } = useLocale();

  const kicker = t("proof.kicker") as string;
  const title = t("proof.title") as string;
  const subtitle = t("proof.subtitle") as string;
  const quote = t("proof.quote") as string;
  const quoteAuthor = t("proof.quoteAuthor") as string;
  const quoteRole = t("proof.quoteRole") as string;
  const ratingText = t("proof.ratingText") as string;

  const stats = [
    {
      val: t("proof.stat1Value") as string,
      unit: t("proof.stat1Unit") as string,
      label: t("proof.stat1Label") as string,
    },
    {
      val: t("proof.stat2Value") as string,
      unit: t("proof.stat2Unit") as string,
      label: t("proof.stat2Label") as string,
    },
    {
      val: t("proof.stat3Value") as string,
      unit: t("proof.stat3Unit") as string,
      label: t("proof.stat3Label") as string,
    },
    {
      val: t("proof.stat4Value") as string,
      unit: t("proof.stat4Unit") as string,
      label: t("proof.stat4Label") as string,
    },
  ];

  return (
    <section id="proof" className="bg-bg-light border-b border-border-light py-20 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layer: Kicker + Heading + Subtitle */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-2">
            {kicker}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
            {title}
          </h2>
          <p className="text-text-muted mt-2 text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Layer: Oversized Pull-quote & Plain-Text Rating */}
        <div className="bg-bg-card rounded border border-border-light p-8 sm:p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="max-w-4xl">
            <span className="font-display text-6xl sm:text-7xl text-accent/40 font-bold block leading-none select-none mb-2">
              «
            </span>
            <blockquote className="font-display text-xl sm:text-2xl font-semibold text-primary leading-snug tracking-tight mb-6">
              {quote}
            </blockquote>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-light pt-4 text-xs font-mono">
              <div>
                <span className="font-bold text-primary">{quoteAuthor}</span>
                <span className="text-text-muted"> — {quoteRole}</span>
              </div>
              <div className="text-accent font-bold tracking-wide">
                {ratingText}
              </div>
            </div>
          </div>
        </div>

        {/* Layer: 4-Column Metric Grid with Tabular Numerals & Hairlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-bg-card p-6 sm:p-7 rounded border border-border-light shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-primary tracking-tight tabular-nums">
                    {item.val}
                  </span>
                  <span className="text-xs font-mono font-semibold uppercase text-accent">
                    {item.unit}
                  </span>
                </div>
                <div className="h-0.5 w-10 bg-accent/40 mb-3" />
              </div>
              <p className="text-xs sm:text-sm text-text-muted leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
