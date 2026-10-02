"use client";
import { useLocale } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLocale();

  const brandTagline = t("brand.tagline") as string;
  const email = t("brand.email") as string;
  const address = t("brand.address") as string;
  const org = t("brand.orgNumber") as string;
  const wordmark = t("footer.wordmark") as string;
  const benchmarkLine = t("footer.benchmarkLine") as string;
  const navHeading = t("footer.navHeading") as string;
  const contactHeading = t("footer.contactHeading") as string;
  const linksHeading = t("footer.linksHeading") as string;
  const linkLinkedin = t("footer.linkLinkedin") as string;
  const linkGithub = t("footer.linkGithub") as string;
  const linkCal = t("footer.linkCal") as string;
  const legal = t("footer.legal") as string;
  const brandVoiceLine = t("footer.brandVoiceLine") as string;
  const madeBy = t("footer.madeBy") as string;
  const devName = t("footer.devName") as string;
  const devUrl = t("footer.devUrl") as string;
  const osloBadge = t("footer.osloBadge") as string;

  return (
    <footer className="bg-bg-dark text-white border-t border-border-dark pt-16 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Grid: Brand, Nav, Contact & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-border-dark">
          {/* Col 1: Brand & Voice Line */}
          <div className="lg:col-span-5">
            <a href="#" className="font-display text-3xl font-bold tracking-tight text-white block mb-2 min-h-[44px] flex items-center">
              {wordmark}<span className="text-accent">.</span>
            </a>
            <p className="text-xs font-mono text-text-dim uppercase tracking-wider mb-4">
              {brandTagline} · OSLO
            </p>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm mb-4">
              {brandVoiceLine}
            </p>
            <div className="text-xs font-mono text-accent">
              {benchmarkLine}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3">
            <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-4">
              {navHeading}
            </span>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#services" className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center">
                  {t("nav.services") as string}
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center">
                  {t("nav.comparison") as string}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center">
                  {t("nav.calculator") as string}
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center">
                  {t("nav.packages") as string}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center">
                  {t("nav.process") as string}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center">
                  {t("nav.faq") as string}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details & Direct Links */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-4">
                {contactHeading}
              </span>
              <div className="space-y-2 text-sm text-white/80 font-mono mb-6">
                <div>{address}</div>
                <div>
                  <a href={`mailto:${email}`} className="text-accent hover:underline min-h-[44px] inline-flex items-center">
                    {email}
                  </a>
                </div>
                <div className="text-xs text-text-dim pt-2">{org}</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest block mb-3">
                {linksHeading}
              </span>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-white/70">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent min-h-[44px] inline-flex items-center">
                  {linkLinkedin}
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent min-h-[44px] inline-flex items-center">
                  {linkGithub}
                </a>
                <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent min-h-[44px] inline-flex items-center">
                  {linkCal}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Bleeding Wordmark Layer */}
        <div className="my-8 select-none pointer-events-none opacity-10 flex justify-center overflow-hidden">
          <span className="font-display font-bold text-7xl sm:text-9xl md:text-[14rem] tracking-tighter text-white whitespace-nowrap">
            {wordmark}
          </span>
        </div>

        {/* Legal & Verified Studio Credit Row */}
        <div className="pt-8 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-dim">
          <div>{legal}</div>
          <div>{osloBadge}</div>
          <div>
            {madeBy}{" "}
            <a
              href={devUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold hover:text-accent transition-colors underline underline-offset-4 min-h-[44px] inline-flex items-center"
            >
              {devName}
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-xs opacity-70"><a href="/privacy" className="underline hover:no-underline">Personvernerklæring</a></div>
    </footer>
  );
}
