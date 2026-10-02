"use client";
import { useLocale } from "@/lib/i18n";

export default function WcagSection() {
  const { t } = useLocale();

  const kicker = t("wcag.kicker") as string;
  const title = t("wcag.title") as string;
  const subtitle = t("wcag.subtitle") as string;
  const legalBadge = t("wcag.legalBadge") as string;

  const cards = [
    {
      title: t("wcag.card1Title") as string,
      text: t("wcag.card1Text") as string,
      code: "WCAG 1.4.3",
    },
    {
      title: t("wcag.card2Title") as string,
      text: t("wcag.card2Text") as string,
      code: "WCAG 2.1.1",
    },
    {
      title: t("wcag.card3Title") as string,
      text: t("wcag.card3Text") as string,
      code: "WCAG 4.1.2",
    },
    {
      title: t("wcag.card4Title") as string,
      text: t("wcag.card4Text") as string,
      code: "FORSKRIFT §4",
    },
  ];

  return (
    <section id="wcag" className="bg-bg-light py-20 sm:py-24 border-b border-border-light scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="bg-bg-card p-6 sm:p-7 rounded border border-border-light shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-mono text-accent font-bold tracking-widest uppercase mb-2">
                  {c.code}
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">
                  {c.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {c.text}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border-light text-xs font-mono text-text-dim">
                {legalBadge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
