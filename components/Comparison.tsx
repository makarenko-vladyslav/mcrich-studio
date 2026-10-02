"use client";
import { useLocale } from "@/lib/i18n";

interface ComparisonPoint {
  label: string;
  agency: string;
  mcrich: string;
}

export default function Comparison() {
  const { t } = useLocale();

  const kicker = t("comparison.kicker") as string;
  const title = t("comparison.title") as string;
  const subtitle = t("comparison.subtitle") as string;
  const colAgency = t("comparison.colAgency") as string;
  const colMcrich = t("comparison.colMcrich") as string;
  const criterion = t("comparison.criterion") as string;
  const traditionalLabel = t("comparison.traditionalLabel") as string;
  const mcrichLabel = t("comparison.mcrichLabel") as string;
  const points = (t("comparison.points") as ComparisonPoint[]) || [];

  return (
    <section id="comparison" className="bg-bg-light py-20 sm:py-24 border-b border-border-light scroll-mt-20">
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

        {/* Dense Comparison Matrix Table */}
        <div className="bg-bg-card rounded border border-border-light shadow-sm overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-primary text-white p-4 sm:p-6 text-sm font-semibold tracking-wide">
            <div className="md:col-span-4 uppercase font-mono text-xs text-white/70">
              {criterion}
            </div>
            <div className="hidden md:block md:col-span-4 text-white/80">
              {colAgency}
            </div>
            <div className="hidden md:block md:col-span-4 text-accent font-bold">
              {colMcrich}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border-light">
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 items-baseline gap-3 md:gap-4 hover:bg-neutral-50/80 transition-colors"
              >
                <div className="md:col-span-4 font-display text-base font-bold text-primary">
                  {pt.label}
                </div>

                <div className="md:col-span-4 text-sm text-text-muted leading-relaxed">
                  <span className="inline-block md:hidden text-xs font-mono uppercase text-red-700 font-bold mr-2">
                    {traditionalLabel}
                  </span>
                  {pt.agency}
                </div>

                <div className="md:col-span-4 text-sm font-semibold text-primary leading-relaxed bg-accent/5 md:bg-transparent p-3 md:p-0 rounded border border-accent/20 md:border-none">
                  <span className="inline-block md:hidden text-xs font-mono uppercase text-accent font-bold mr-2">
                    {mcrichLabel}
                  </span>
                  <span className="text-accent mr-1.5 font-bold">✓</span>
                  {pt.mcrich}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
