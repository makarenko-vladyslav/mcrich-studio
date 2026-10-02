"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Services from "@/components/Services";
import Comparison from "@/components/Comparison";
import Calculator from "@/components/Calculator";
import Packages from "@/components/Packages";
import VideoShowcase from "@/components/VideoShowcase";
import Process from "@/components/Process";
import WcagSection from "@/components/WcagSection";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Coverage from "@/components/Coverage";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/motion";
import { useLocale } from "@/lib/i18n";

export default function Home() {
  const { t } = useLocale();

  const tickerItems = (t("interstitials.tickerItems") as string[]) || [];
  const hairlineStandard = t("interstitials.hairlineStandard") as string;
  const quoteStatement = t("interstitials.quoteStatement") as string;
  const quoteAuthor = t("interstitials.quoteAuthor") as string;
  const legalStandard = t("interstitials.legalStandard") as string;
  const coverageTitle = t("interstitials.coverageTitle") as string;
  const coverageZones = (t("interstitials.coverageZones") as string[]) || [];

  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Interstitial Strip 1: Seamless Marquee Ticker */}
        <div className="bg-bg-dark text-white border-b border-white/10 py-3 overflow-hidden select-none">
          <div className="whitespace-nowrap flex text-xs font-mono tracking-widest uppercase text-white/70 animate-[marquee_25s_linear_infinite]">
            {tickerItems.map((item, idx) => (
              <span key={`strip1-a-${idx}`} className="inline-flex items-center">
                <span className="mx-4">{item}</span>
                <span className="text-accent">·</span>
              </span>
            ))}
            {tickerItems.map((item, idx) => (
              <span key={`strip1-b-${idx}`} className="inline-flex items-center">
                <span className="mx-4">{item}</span>
                <span className="text-accent">·</span>
              </span>
            ))}
          </div>
        </div>

        <Reveal>
          <SocialProof />
        </Reveal>

        <Reveal>
          <Services />
        </Reveal>

        {/* Interstitial Strip 2: Labeled Hairline */}
        <div className="bg-bg-light border-y border-border-light py-4 text-center">
          <span className="text-[11px] font-mono tracking-widest uppercase text-accent font-bold">
            {hairlineStandard}
          </span>
        </div>

        <Reveal>
          <Comparison />
        </Reveal>

        <Reveal>
          <Calculator />
        </Reveal>

        <Reveal>
          <Packages />
        </Reveal>

        {/* Interstitial Strip 3: Standalone High-Contrast Statement Band */}
        <div className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-border-dark text-center">
          <div className="max-w-4xl mx-auto">
            <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 leading-snug">
              {quoteStatement}
            </p>
            <span className="text-xs font-mono text-accent font-semibold tracking-wider uppercase">
              {quoteAuthor}
            </span>
          </div>
        </div>

        <Reveal>
          <VideoShowcase />
        </Reveal>

        <Reveal>
          <Process />
        </Reveal>

        {/* Interstitial Strip 4: Official Compliance Strip */}
        <div className="bg-bg-light border-y border-border-light py-4 text-center">
          <span className="text-[11px] font-mono tracking-widest uppercase text-text-muted">
            {legalStandard}
          </span>
        </div>

        <Reveal>
          <WcagSection />
        </Reveal>

        <Reveal>
          <Team />
        </Reveal>

        <Reveal>
          <Testimonials />
        </Reveal>

        {/* Interstitial Strip 5: Geographic Ticker */}
        <div className="bg-white border-y border-border-light py-3 overflow-hidden select-none">
          <div className="whitespace-nowrap flex text-xs font-mono tracking-wider uppercase text-text-dim animate-[marquee_30s_linear_infinite]">
            <span className="mx-4 font-bold text-primary">{coverageTitle}</span>
            {coverageZones.map((zone, idx) => (
              <span key={`geo-a-${idx}`} className="inline-flex items-center">
                <span className="mx-3">{zone}</span>
                <span className="text-accent">·</span>
              </span>
            ))}
            <span className="mx-4 font-bold text-primary">{coverageTitle}</span>
            {coverageZones.map((zone, idx) => (
              <span key={`geo-b-${idx}`} className="inline-flex items-center">
                <span className="mx-3">{zone}</span>
                <span className="text-accent">·</span>
              </span>
            ))}
          </div>
        </div>

        <Reveal>
          <Coverage />
        </Reveal>

        <Reveal>
          <FAQ />
        </Reveal>

        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
