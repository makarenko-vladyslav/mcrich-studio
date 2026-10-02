"use client";
import { useLocale } from "@/lib/i18n";

export default function Coverage() {
  const { t } = useLocale();

  const kicker = t("coverage.kicker") as string;
  const title = t("coverage.title") as string;
  const subtitle = t("coverage.subtitle") as string;
  const activeOrder = t("coverage.activeOrder") as string;
  const zones = (t("coverage.zones") as string[]) || [];
  const zoneNote = t("coverage.zoneNote") as string;

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-2">
            {kicker}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            {title}
          </h2>
          <p className="text-text-muted mt-2 text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {zones.map((zone, idx) => (
            <div
              key={idx}
              className="bg-bg-light p-3.5 rounded border border-border-light text-center flex flex-col justify-center"
            >
              <span className="font-display text-base font-bold text-primary">
                {zone}
              </span>
              <span className="text-[11px] font-mono text-accent mt-0.5">
                {activeOrder}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs font-mono text-text-dim leading-relaxed">
          {zoneNote}
        </p>
      </div>
    </section>
  );
}
