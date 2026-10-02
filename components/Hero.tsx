"use client";
import { useLocale } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLocale();

  const watermark = t("hero.watermark") as string;
  const kicker = t("hero.kicker") as string;
  const part1 = t("hero.headlinePart1") as string;
  const italic = t("hero.headlineItalic") as string;
  const part2 = t("hero.headlinePart2") as string;
  const lede = t("hero.lede") as string;
  const ctaPrimary = t("hero.ctaPrimary") as string;
  const ctaSecondary = t("hero.ctaSecondary") as string;
  const metaResponse = t("hero.metaResponse") as string;
  const metaAddress = t("hero.metaAddress") as string;
  const metaScore = t("hero.metaScore") as string;
  const flankLeft = t("hero.flankLeft") as string;
  const flankRight = t("hero.flankRight") as string;
  const sealText = t("hero.sealText") as string;
  const auditBenchmark = t("hero.auditBenchmark") as string;
  const verified = t("hero.verified") as string;
  const cardTitle = t("hero.floatingCardTitle") as string;
  const cardMetric = t("hero.floatingCardMetric") as string;
  const cardSub = t("hero.floatingCardSub") as string;
  const fcpLabel = t("hero.fcpLabel") as string;
  const lcpLabel = t("hero.lcpLabel") as string;
  const wcagContrastLabel = t("hero.wcagContrastLabel") as string;
  const scrollDown = t("hero.scrollDown") as string;
  const tickerPhrase = t("hero.tickerPhrase") as string;

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between bg-bg-dark text-white overflow-hidden pt-24 sm:pt-28 pb-4">
      {/* Giant Background Watermark (Layer: Decorative Type) */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display font-bold text-[22vw] leading-none text-white/[0.03] tracking-tighter whitespace-nowrap">
          {watermark}
        </span>
      </div>

      {/* Layer: Video Stack with ONLY ONE scrim layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/videos/12283283/business-ideas-it-office-job-office-meeting-12283283.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
          className="w-full h-full object-cover scale-105"
        >
          <source
            src="https://videos.pexels.com/video-files/12283283/12283283-hd_1280_720_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/90 via-bg-dark/75 to-bg-dark" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6">
        {/* Flanking Micro-Copy Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-[11px] font-mono text-white/50 tracking-wider">
          <span>{flankLeft}</span>
          <span className="text-accent">{flankRight}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            {/* Real Metadata Kicker */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded bg-white/10 border border-white/15 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono tracking-wider uppercase text-white/95 font-medium">
                {kicker}
              </span>
            </div>

            {/* Poster H1 with Italic Accent */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.03] text-balance mb-6">
              {part1}{" "}
              <span className="italic font-normal text-accent underline decoration-white/20 decoration-2 underline-offset-8">
                {italic}
              </span>{" "}
              {part2}
            </h1>

            {/* Lede */}
            <p className="text-base sm:text-lg text-white/85 max-w-2xl font-normal leading-relaxed mb-8">
              {lede}
            </p>

            {/* CTA Pair */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center min-h-[44px] bg-accent hover:bg-accent-dark text-white font-semibold text-sm sm:text-base px-8 py-4 rounded transition-all duration-200 tracking-wide uppercase text-center shadow-lg shadow-accent/25"
              >
                {ctaPrimary}
              </a>
              <a
                href="#packages"
                className="inline-flex items-center justify-center min-h-[44px] bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-sm sm:text-base px-6 py-4 rounded transition-colors text-center"
              >
                {ctaSecondary}
              </a>
            </div>

            {/* 3-Item Meta Strip with Hairline Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-white/15 pt-5 w-full max-w-3xl text-[11px] font-mono text-white/70">
              <div className="pr-2">{metaResponse}</div>
              <div className="sm:border-l sm:border-white/15 sm:pl-4 pr-2">{metaAddress}</div>
              <div className="sm:border-l sm:border-white/15 sm:pl-4 text-accent font-semibold">{metaScore}</div>
            </div>
          </div>

          {/* Right Artifact & Circular Text Seal */}
          <div className="lg:col-span-4 w-full flex flex-col items-center lg:items-end gap-6">
            {/* Rotating Text-Only Seal (Zero glyphs/icons) */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 hidden sm:flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-[spin_20s_linear_infinite]"
                aria-hidden="true"
              >
                <path
                  id="sealCircle"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[10px] font-mono tracking-widest uppercase fill-accent font-bold">
                  <textPath href="#sealCircle">{sealText}</textPath>
                </text>
              </svg>
              <span className="absolute font-mono text-[9px] font-bold text-white/80 tracking-tighter">
                2026
              </span>
            </div>

            {/* Floating Quality Artifact Card */}
            <div className="w-full max-w-sm rounded-lg bg-bg-card-dark/95 border border-border-dark p-6 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-border-dark pb-3.5 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-dim">
                  {auditBenchmark}
                </span>
                <span className="text-[10px] font-mono font-bold text-accent px-2 py-0.5 bg-accent/15 rounded">
                  {verified}
                </span>
              </div>

              <div className="mb-4">
                <div className="font-display text-5xl font-bold text-white tracking-tight">
                  {cardMetric}
                </div>
                <div className="text-sm font-semibold text-white/95 mt-1">
                  {cardTitle}
                </div>
                <div className="text-xs text-text-dim mt-0.5 leading-relaxed">
                  {cardSub}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-border-dark text-xs font-mono text-white/80">
                <div className="flex justify-between items-center">
                  <span>{fcpLabel}</span>
                  <span className="text-accent font-bold">0.6s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{lcpLabel}</span>
                  <span className="text-accent font-bold">1.1s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{wcagContrastLabel}</span>
                  <span className="text-accent font-bold">100% OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Ticker & Classic Centered Scroll Cue */}
      <div className="relative z-10 w-full pt-4">
        {/* Seamless Text Ticker */}
        <div className="w-full overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-sm py-2 text-[11px] font-mono text-white/60 tracking-wider">
          <div className="whitespace-nowrap flex animate-[marquee_30s_linear_infinite]">
            <span>{tickerPhrase}</span>
            <span>{tickerPhrase}</span>
            <span>{tickerPhrase}</span>
          </div>
        </div>

        {/* Scroll Cue in normal flow with compliant 44px tap target */}
        <div className="text-center pt-3 pb-1">
          <a
            href="#proof"
            className="inline-flex flex-col items-center justify-center min-h-[44px] px-4 py-2 text-white/50 hover:text-white transition-colors"
            aria-label={scrollDown}
          >
            <span className="text-[9px] font-mono tracking-widest uppercase">
              {scrollDown}
            </span>
            <span className="block w-px h-5 bg-gradient-to-b from-accent to-transparent animate-pulse mt-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
