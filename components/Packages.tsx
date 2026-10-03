"use client";
import { useState } from "react";
import { useLocale } from "@/lib/i18n";

interface LineItem {
  category: string;
  name: string;
  price: string;
  desc: string;
  tag: string;
  signature: boolean;
}

export default function Packages() {
  const { t } = useLocale();
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const kicker = t("packages.kicker") as string;
  const title = t("packages.title") as string;
  const subtitle = t("packages.subtitle") as string;
  const badgeMvp = t("packages.badgeMvp") as string;
  const badgeGrowth = t("packages.badgeGrowth") as string;
  const badgeEnterprise = t("packages.badgeEnterprise") as string;
  const recommendedTag = t("packages.recommended") as string;
  const selectLabel = t("packages.selectPkg") as string;
  const breakdownKicker = t("packages.breakdownKicker") as string;
  const breakdownTitle = t("packages.breakdownTitle") as string;
  const catAll = t("packages.catAll") as string;
  const catCore = t("packages.catCore") as string;
  const catIntegrations = t("packages.catIntegrations") as string;
  const catCompliance = t("packages.catCompliance") as string;
  const footnote = t("packages.footnote") as string;
  const secondaryCta = t("packages.secondaryCta") as string;
  const lineItems = (t("packages.lineItems") as LineItem[]) || [];

  const pkg1 = {
    title: t("packages.pkg1Title") as string,
    price: t("packages.pkg1Price") as string,
    duration: t("packages.pkg1Duration") as string,
    desc: t("packages.pkg1Desc") as string,
    features: (t("packages.pkg1Features") as string[]) || [],
  };

  const pkg2 = {
    title: t("packages.pkg2Title") as string,
    price: t("packages.pkg2Price") as string,
    duration: t("packages.pkg2Duration") as string,
    desc: t("packages.pkg2Desc") as string,
    features: (t("packages.pkg2Features") as string[]) || [],
  };

  const pkg3 = {
    title: t("packages.pkg3Title") as string,
    price: t("packages.pkg3Price") as string,
    duration: t("packages.pkg3Duration") as string,
    desc: t("packages.pkg3Desc") as string,
    features: (t("packages.pkg3Features") as string[]) || [],
  };

  const filteredItems =
    filterCategory === "all"
      ? lineItems
      : lineItems.filter((i) => i.category === filterCategory);

  return (
    <section id="packages" className="bg-bg-light py-20 sm:py-24 border-b border-border-light scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layer: Kicker + Heading + Subtitle */}
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

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {/* Package 1 */}
          <div className="bg-bg-card rounded border border-border-light p-7 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
                {badgeMvp}
              </span>
              <h3 className="font-display text-2xl font-bold text-primary mt-1 mb-2">
                {pkg1.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-6">
                {pkg1.desc}
              </p>

              <div className="border-y border-border-light py-4 mb-6">
                <div className="font-display text-4xl font-bold text-primary tabular-nums">
                  {pkg1.price}
                </div>
                <div className="text-xs font-mono text-accent mt-0.5 font-medium">
                  {pkg1.duration}
                </div>
              </div>

              <ul className="space-y-3 text-sm text-text-main mb-8">
                {pkg1.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-accent font-bold text-xs mt-0.5 font-mono">—</span>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center min-h-[44px] text-center py-3.5 px-4 border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-xs tracking-wider uppercase rounded transition-colors"
            >
              {selectLabel}
            </a>
          </div>

          {/* Package 2 (Highlighted Signature) */}
          <div className="bg-primary text-white rounded border-2 border-accent p-7 sm:p-8 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3.5 right-6 bg-accent text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
              {recommendedTag}
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                {badgeGrowth}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1 mb-2">
                {pkg2.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                {pkg2.desc}
              </p>

              <div className="border-y border-white/15 py-4 mb-6">
                <div className="font-display text-4xl font-bold text-white tabular-nums">
                  {pkg2.price}
                </div>
                <div className="text-xs font-mono text-accent mt-0.5 font-medium">
                  {pkg2.duration}
                </div>
              </div>

              <ul className="space-y-3 text-sm text-white/90 mb-8">
                {pkg2.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-accent font-bold text-xs mt-0.5 font-mono">—</span>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center min-h-[44px] text-center py-4 px-4 bg-accent hover:bg-accent-dark text-white font-semibold text-xs tracking-wider uppercase rounded transition-colors shadow-md"
            >
              {selectLabel}
            </a>
          </div>

          {/* Package 3 */}
          <div className="bg-bg-card rounded border border-border-light p-7 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
                {badgeEnterprise}
              </span>
              <h3 className="font-display text-2xl font-bold text-primary mt-1 mb-2">
                {pkg3.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-6">
                {pkg3.desc}
              </p>

              <div className="border-y border-border-light py-4 mb-6">
                <div className="font-display text-4xl font-bold text-primary tabular-nums">
                  {pkg3.price}
                </div>
                <div className="text-xs font-mono text-accent mt-0.5 font-medium">
                  {pkg3.duration}
                </div>
              </div>

              <ul className="space-y-3 text-sm text-text-main mb-8">
                {pkg3.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-accent font-bold text-xs mt-0.5 font-mono">—</span>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center min-h-[44px] text-center py-3.5 px-4 border border-primary text-primary hover:bg-primary hover:text-white font-semibold text-xs tracking-wider uppercase rounded transition-colors"
            >
              {selectLabel}
            </a>
          </div>
        </div>

        {/* Detailed Itemized Specification Schedule */}
        <div className="bg-bg-card rounded border border-border-light p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-light pb-6 mb-8 gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-1">
                {breakdownKicker}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                {breakdownTitle}
              </h3>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFilterCategory("all")}
                className={`text-xs font-mono font-semibold px-3 py-2 min-h-[44px] rounded transition-colors inline-flex items-center justify-center ${
                  filterCategory === "all"
                    ? "bg-primary text-white"
                    : "bg-bg-light text-text-muted hover:text-primary"
                }`}
              >
                {catAll}
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory("core")}
                className={`text-xs font-mono font-semibold px-3 py-2 min-h-[44px] rounded transition-colors inline-flex items-center justify-center ${
                  filterCategory === "core"
                    ? "bg-primary text-white"
                    : "bg-bg-light text-text-muted hover:text-primary"
                }`}
              >
                {catCore}
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory("integrations")}
                className={`text-xs font-mono font-semibold px-3 py-2 min-h-[44px] rounded transition-colors inline-flex items-center justify-center ${
                  filterCategory === "integrations"
                    ? "bg-primary text-white"
                    : "bg-bg-light text-text-muted hover:text-primary"
                }`}
              >
                {catIntegrations}
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory("compliance")}
                className={`text-xs font-mono font-semibold px-3 py-2 min-h-[44px] rounded transition-colors inline-flex items-center justify-center ${
                  filterCategory === "compliance"
                    ? "bg-primary text-white"
                    : "bg-bg-light text-text-muted hover:text-primary"
                }`}
              >
                {catCompliance}
              </button>
            </div>
          </div>

          {/* Dotted Leader Rows */}
          <div className="space-y-5">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded transition-colors ${
                  item.signature
                    ? "bg-accent/5 border border-accent/20"
                    : "hover:bg-neutral-50/80"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center items-start gap-1.5 sm:gap-3">
                    <span className="font-display text-lg sm:text-xl font-bold text-primary">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent px-2 py-0.5 bg-accent/10 rounded w-fit shrink-0">
                      {item.tag}
                    </span>
                  </div>

                  {/* Dotted Leader Bar (Desktop) */}
                  <div className="hidden sm:block flex-1 mx-4 border-b border-dotted border-border-light" />

                  <span className="font-display text-xl sm:text-2xl font-bold text-primary tabular-nums shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footnote & Secondary CTA */}
          <div className="mt-8 pt-6 border-t border-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <span className="text-text-dim max-w-xl">{footnote}</span>
            <a
              href="#contact"
              className="text-accent hover:text-accent-dark font-bold underline underline-offset-4 tracking-wide shrink-0 inline-flex items-center min-h-[44px] py-2"
            >
              {secondaryCta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
