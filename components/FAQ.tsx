"use client";
import { useState } from "react";
import { useLocale } from "@/lib/i18n";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const { t } = useLocale();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const kicker = t("faq.kicker") as string;
  const title = t("faq.title") as string;
  const subtitle = t("faq.subtitle") as string;
  const items = (t("faq.items") as FAQItem[]) || [];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-bg-light py-20 sm:py-24 border-b border-border-light scroll-mt-20">
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

        {/* Full-width accordion sharing edges */}
        <div className="divide-y divide-border-light border-y border-border-light bg-bg-card rounded shadow-sm">
          {items.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left py-6 px-6 sm:px-8 flex items-center justify-between gap-4 focus:outline-none hover:bg-neutral-50"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-xl font-bold text-primary tracking-tight">
                    {faq.question}
                  </span>
                  <span className="font-mono text-lg font-bold text-accent shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-sm sm:text-base text-text-muted leading-relaxed border-t border-border-light/40 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
