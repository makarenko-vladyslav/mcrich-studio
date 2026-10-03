"use client";
import { useState } from "react";
import { useLocale } from "@/lib/i18n";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  specs: string;
  tag: string;
}

export default function Services() {
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState<number>(0);

  const kicker = t("services.kicker") as string;
  const title = t("services.title") as string;
  const subtitle = t("services.subtitle") as string;
  const activeSpec = t("services.activeSpec") as string;
  const ctaCalculate = t("services.ctaCalculate") as string;
  const rawItems = (t("services.items") as ServiceItem[]) || [];

  const serviceImages = [
    "https://images.pexels.com/photos/27427258/pexels-photo-27427258.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "https://images.pexels.com/photos/1034650/pexels-photo-1034650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "https://images.pexels.com/photos/36631699/pexels-photo-36631699.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "https://images.pexels.com/photos/7662061/pexels-photo-7662061.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "https://images.pexels.com/photos/8463151/pexels-photo-8463151.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  ];

  return (
    <section id="services" className="bg-white py-20 sm:py-24 border-b border-border-light scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
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

        {/* Directory List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive selector rows */}
          <div className="lg:col-span-7 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible divide-x lg:divide-x-0 lg:divide-y divide-border-light border-y border-border-light pb-4 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {rawItems.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left py-6 px-4 min-h-[44px] transition-all duration-200 flex flex-col gap-2 rounded focus:outline-none shrink-0 w-[280px] sm:w-[320px] lg:w-full snap-start ${
                    isActive
                      ? "bg-bg-light pl-6 border-l-4 border-l-accent"
                      : "hover:bg-bg-light/60 hover:pl-5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                      {item.tag}
                    </span>
                    <span className="font-mono text-xs text-text-dim">
                      [0{idx + 1}]
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-primary tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-text-muted leading-relaxed max-w-xl">
                    {item.description}
                  </p>

                  <div className="text-xs font-mono text-text-dim pt-2 border-t border-border-light/60">
                    {item.specs}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Service Detailed Showcase Panel */}
          <div className="lg:col-span-5 sticky top-28">
            {rawItems[activeTab] && (
              <div className="bg-bg-card rounded border border-border-light overflow-hidden shadow-md">
                <div className="aspect-[16/10] w-full overflow-hidden bg-bg-dark">
                  <img
                    src={serviceImages[activeTab] || serviceImages[0]}
                    alt={rawItems[activeTab].title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <span className="text-xs font-mono text-accent font-bold tracking-widest uppercase">
                    {activeSpec}
                  </span>
                  <h4 className="font-display text-2xl font-bold text-primary mt-1 mb-3">
                    {rawItems[activeTab].title}
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed mb-5">
                    {rawItems[activeTab].description}
                  </p>
                  <div className="bg-bg-light p-3.5 rounded border border-border-light text-xs font-mono text-text-main mb-6">
                    {rawItems[activeTab].specs}
                  </div>
                  <a
                    href="#calculator"
                    className="flex items-center justify-center min-h-[44px] text-center bg-primary hover:bg-primary/90 text-white font-semibold text-xs tracking-wider uppercase py-3 px-4 rounded transition-colors"
                  >
                    {ctaCalculate}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
