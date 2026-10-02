"use client";
import { useLocale } from "@/lib/i18n";

export default function VideoShowcase() {
  const { t } = useLocale();

  const kicker = t("videoShowcase.kicker") as string;
  const title = t("videoShowcase.title") as string;
  const subtitle = t("videoShowcase.subtitle") as string;
  const manifestBadge = t("videoShowcase.manifestBadge") as string;
  const testBadge = t("videoShowcase.testBadge") as string;
  const productionBadge = t("videoShowcase.productionBadge") as string;
  const auditBadge = t("videoShowcase.auditBadge") as string;
  const fpsBadge = t("videoShowcase.fpsBadge") as string;
  const pullQuote = t("videoShowcase.pullQuote") as string;
  const personName = t("videoShowcase.personName") as string;
  const personRole = t("videoShowcase.personRole") as string;
  const photoCaption = t("videoShowcase.photoCaption") as string;
  const stat1 = t("videoShowcase.stat1") as string;
  const stat1Label = t("videoShowcase.stat1Label") as string;
  const stat2 = t("videoShowcase.stat2") as string;
  const stat2Label = t("videoShowcase.stat2Label") as string;
  const stat3 = t("videoShowcase.stat3") as string;
  const stat3Label = t("videoShowcase.stat3Label") as string;
  const stat4 = t("videoShowcase.stat4") as string;
  const stat4Label = t("videoShowcase.stat4Label") as string;
  const linkText = t("videoShowcase.linkText") as string;

  return (
    <section className="bg-bg-dark text-white py-20 sm:py-28 border-b border-border-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Layer: Kicker + Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-2">
            {kicker}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            {title}
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 2-Column Craft & Performance Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14">
          {/* Left Text / Pull Quote / Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-6 sm:p-7 rounded border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-xs font-mono uppercase text-accent font-bold tracking-wider block mb-2">
                {manifestBadge}
              </span>
              <p className="font-display text-lg sm:text-xl italic text-white/95 leading-relaxed mb-4">
                {pullQuote}
              </p>
              <div className="pt-3 border-t border-white/10 text-xs font-mono text-white/60">
                <span className="text-white font-bold">{personName}</span> — {personRole}
              </div>
            </div>

            {/* 4-Statistic Numeral Cluster */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded border border-white/10 bg-bg-card-dark">
                <div className="font-display text-3xl font-bold text-accent tabular-nums">
                  {stat1}
                </div>
                <div className="text-[11px] font-mono text-white/60 mt-0.5">
                  {stat1Label}
                </div>
              </div>
              <div className="p-4 rounded border border-white/10 bg-bg-card-dark">
                <div className="font-display text-3xl font-bold text-white tabular-nums">
                  {stat2}
                </div>
                <div className="text-[11px] font-mono text-white/60 mt-0.5">
                  {stat2Label}
                </div>
              </div>
              <div className="p-4 rounded border border-white/10 bg-bg-card-dark">
                <div className="font-display text-3xl font-bold text-white tabular-nums">
                  {stat3}
                </div>
                <div className="text-[11px] font-mono text-white/60 mt-0.5">
                  {stat3Label}
                </div>
              </div>
              <div className="p-4 rounded border border-white/10 bg-bg-card-dark">
                <div className="font-display text-3xl font-bold text-accent tabular-nums">
                  {stat4}
                </div>
                <div className="text-[11px] font-mono text-white/60 mt-0.5">
                  {stat4Label}
                </div>
              </div>
            </div>

            <a
              href="#services"
              className="inline-flex items-center min-h-[44px] py-2 px-3 -ml-3 text-xs font-mono font-bold text-accent hover:underline uppercase tracking-wider"
            >
              {linkText} →
            </a>
          </div>

          {/* Right: Overlapped Media Cluster */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-lg overflow-hidden border border-border-dark bg-black shadow-2xl relative aspect-[16/9]">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.pexels.com/videos/12283404/business-ideas-it-office-job-office-meeting-12283404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
                className="w-full h-full object-cover"
              >
                <source
                  src="https://videos.pexels.com/video-files/12283404/12283404-hd_1280_720_25fps.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute bottom-4 left-4 right-4 bg-bg-dark/90 backdrop-blur-md p-3.5 rounded border border-border-dark flex items-center justify-between text-xs font-mono">
                <span className="text-white/90">{testBadge}</span>
                <span className="text-accent font-bold">{productionBadge}</span>
              </div>
            </div>

            {/* Overlapping Inset Photo Badge */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-48 rounded border border-white/20 bg-bg-card-dark p-2 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/20181989/pexels-photo-20181989.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                alt="Kode-inspeksjon"
                className="w-full aspect-[4/3] object-cover rounded"
                loading="lazy"
              />
              <div className="text-[9px] font-mono text-white/70 mt-1.5 uppercase tracking-tight">
                {auditBadge}
              </div>
            </div>
          </div>
        </div>

        {/* Micro-Rule with Section Caption */}
        <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>{photoCaption}</span>
          <span className="text-accent">{fpsBadge}</span>
        </div>
      </div>
    </section>
  );
}
