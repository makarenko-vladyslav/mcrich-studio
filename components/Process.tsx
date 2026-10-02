"use client";
import { useLocale } from "@/lib/i18n";

interface StepItem {
  step: string;
  title: string;
  description: string;
}

export default function Process() {
  const { t } = useLocale();

  const kicker = t("process.kicker") as string;
  const title = t("process.title") as string;
  const subtitle = t("process.subtitle") as string;
  const milestoneLabel = t("process.milestoneLabel") as string;
  const steps = (t("process.steps") as StepItem[]) || [];

  return (
    <section id="process" className="bg-white py-20 sm:py-24 border-b border-border-light scroll-mt-20">
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

        {/* Compact Full-width Horizontal Sprint Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-bg-light p-6 sm:p-7 rounded border border-border-light flex flex-col justify-between relative group hover:border-accent transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-accent px-2 py-0.5 bg-accent/10 rounded">
                    {st.step}
                  </span>
                  <span className="font-mono text-xs text-text-dim">
                    TRINN 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-primary mb-3 leading-snug">
                  {st.title}
                </h3>

                <p className="text-sm text-text-muted leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-light/60 flex items-center justify-between text-xs font-mono text-text-dim">
                <span>{milestoneLabel}</span>
                <span className="text-accent font-bold">✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
