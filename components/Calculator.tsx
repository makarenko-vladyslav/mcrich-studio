"use client";
import { useState, useId } from "react";
import { useLocale } from "@/lib/i18n";
import pricing from "@/lib/pricing.json";

export default function Calculator() {
  const { t } = useLocale();
  const pageSliderId = useId();
  const [pages, setPages] = useState<number>(5);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({
    wcag: true,
    vipps: false,
    fiken: true,
    bilingual: false,
    cms: true,
    seo: true,
  });

  const kicker = t("calculator.kicker") as string;
  const title = t("calculator.title") as string;
  const subtitle = t("calculator.subtitle") as string;
  const pagesLabel = t("calculator.pagesLabel") as string;
  const pageCountUnit = t("calculator.pageCountUnit") as string;
  const sliderMin = t("calculator.sliderMin") as string;
  const sliderMid = t("calculator.sliderMid") as string;
  const sliderMax = t("calculator.sliderMax") as string;
  const integrationsHeading = t("calculator.integrationsHeading") as string;
  const addOption = t("calculator.addOption") as string;
  const selectedOption = t("calculator.selectedOption") as string;
  const fixedEstimateBadge = t("calculator.fixedEstimateBadge") as string;
  const summaryTitle = t("calculator.summaryTitle") as string;
  const totalEstimateLabel = t("calculator.totalEstimateLabel") as string;
  const ownershipNote = t("calculator.ownershipNote") as string;
  const turnaroundLabel = t("calculator.turnaroundLabel") as string;
  const turnaroundVal = t("calculator.turnaroundVal") as string;
  const agreementLabel = t("calculator.agreementLabel") as string;
  const agreementVal = t("calculator.agreementVal") as string;
  const uuLabel = t("calculator.uuLabel") as string;
  const uuVal = t("calculator.uuVal") as string;
  const fixedGuarantee = t("calculator.fixedPriceGuarantee") as string;
  const ctaText = t("calculator.cta") as string;

  const optionsMap = (t("calculator.options") as Record<string, string>) || {};

  const toggleOption = (key: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Cost calculation arithmetic
  const baseCost = pricing.basePrices.company;
  const extraPagesCost = Math.max(0, pages - 3) * pricing.pageRates.standard;

  let addonsTotal = 0;
  if (selectedOptions.wcag) addonsTotal += pricing.additions.wcagAudit;
  if (selectedOptions.vipps) addonsTotal += pricing.additions.vippsIntegration;
  if (selectedOptions.fiken) addonsTotal += pricing.additions.fikenTripletexSync;
  if (selectedOptions.bilingual) addonsTotal += pricing.additions.bilingual;
  if (selectedOptions.cms) addonsTotal += pricing.additions.cmsCustom;
  if (selectedOptions.seo) addonsTotal += pricing.additions.seoOsloPack;

  const totalEstimate = baseCost + extraPagesCost + addonsTotal;

  // Custom Norwegian number formatter (no toLocaleString!)
  const formatNOK = (n: number) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") + " NOK";
  };

  return (
    <section id="calculator" className="bg-white py-20 sm:py-24 border-b border-border-light scroll-mt-20">
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

        {/* Interactive Calculator Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-bg-light p-6 sm:p-8 rounded border border-border-light space-y-8">
            {/* Pages Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label htmlFor={pageSliderId} className="font-display text-lg font-bold text-primary">
                  {pagesLabel}
                </label>
                <span className="font-display text-2xl font-bold text-accent">
                  {pages} {pageCountUnit}
                </span>
              </div>
              <input
                id={pageSliderId}
                type="range"
                min="1"
                max="16"
                step="1"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-border-light rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] font-mono text-text-dim mt-2">
                <span>{sliderMin}</span>
                <span>{sliderMid}</span>
                <span>{sliderMax}</span>
              </div>
            </div>

            {/* Checkbox Options */}
            <div>
              <h3 className="font-display text-base font-bold text-primary mb-4 uppercase tracking-wide">
                {integrationsHeading}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(optionsMap).map(([key, label]) => {
                  const isChecked = !!selectedOptions[key];
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => toggleOption(key)}
                      className={`text-left p-3.5 min-h-[44px] rounded border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 focus:outline-none ${
                        isChecked
                          ? "bg-bg-card border-accent text-primary shadow-sm"
                          : "bg-white/60 border-border-light text-text-muted hover:border-text-dim"
                      }`}
                    >
                      <span className="text-sm font-medium sm:pr-3">{label}</span>
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded transition-colors whitespace-nowrap self-start sm:self-auto shrink-0 ${
                          isChecked
                            ? "bg-accent text-white"
                            : "bg-neutral-200 text-text-dim"
                        }`}
                      >
                        {isChecked ? selectedOption : addOption}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing Quote Summary Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-primary text-white p-7 sm:p-9 rounded shadow-xl border border-border-dark flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-accent font-bold uppercase tracking-widest block mb-2">
                  {fixedEstimateBadge}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight mb-6">
                  {summaryTitle}
                </h3>

                <div className="border-t border-white/15 pt-5 mb-6">
                  <div className="text-xs font-mono text-white/70 mb-1">
                    {totalEstimateLabel}
                  </div>
                  <div className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight text-accent">
                    {formatNOK(totalEstimate)}
                  </div>
                  <div className="text-[11px] font-mono text-white/60 mt-1">
                    {ownershipNote}
                  </div>
                </div>

                <div className="space-y-2.5 text-xs font-mono text-white/80 border-t border-white/15 pt-5 mb-8">
                  <div className="flex justify-between">
                    <span>{turnaroundLabel}</span>
                    <span className="text-white font-bold">{turnaroundVal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{agreementLabel}</span>
                    <span className="text-accent font-bold">{agreementVal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{uuLabel}</span>
                    <span className="text-white">{uuVal}</span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center min-h-[44px] text-center bg-accent hover:bg-accent-dark text-white font-semibold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded transition-colors shadow-md"
                >
                  {ctaText}
                </a>
                <p className="text-[11px] text-center text-white/60 mt-3 font-mono">
                  {fixedGuarantee}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
