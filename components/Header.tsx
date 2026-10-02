
"use client";
import { useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n";

export default function Header() {
  const { t, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const allNavLinks = [
    { href: "#services", label: t("nav.services") as string },
    { href: "#comparison", label: t("nav.comparison") as string },
    { href: "#calculator", label: t("nav.calculator") as string },
    { href: "#packages", label: t("nav.packages") as string },
    { href: "#process", label: t("nav.process") as string },
    { href: "#wcag", label: t("nav.wcag") as string },
    { href: "#faq", label: t("nav.faq") as string },
  ];

  // Keep desktop navigation to a few short labels; the full navigation is in the menu
  const desktopNavLinks = [
    { href: "#services", label: t("nav.services") as string },
    { href: "#packages", label: t("nav.packages") as string },
    { href: "#faq", label: t("nav.faq") as string },
  ];

  const brandName = t("brand.name") as string;
  const brandWordmark = t("brand.wordmark") as string;
  const brandSubmark = t("brand.submark") as string;
  const switchLabel = t("nav.switchLang") as string;
  const ctaLabel = t("nav.cta") as string;
  const menuCloseLabel = t("nav.menuCloseLabel") as string;
  const langLabel = t("nav.langLabel") as string;

  const toggleLanguage = () => {
    setLocale(locale === "no" ? "en" : "no");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-bg-light/95 backdrop-blur-md border-b border-border-light shadow-sm py-2 sm:py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Wordmark */}
            <a
              href="#"
              className="group flex flex-col justify-center min-h-[44px] py-1 focus:outline-none shrink-0"
              aria-label={brandName}
            >
              <span
                className={`font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors whitespace-nowrap ${
                  scrolled ? "text-primary" : "text-white"
                }`}
              >
                {brandWordmark}<span className="text-accent">.</span>
              </span>
              <span
                className={`text-[10px] uppercase tracking-widest font-mono font-medium -mt-1 whitespace-nowrap ${
                  scrolled ? "text-text-muted" : "text-white/70"
                }`}
              >
                {brandSubmark}
              </span>
            </a>

            {/* Desktop Navigation Links (kept to a few short labels) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
              {desktopNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-normal transition-colors hover:text-accent whitespace-nowrap inline-flex items-center min-h-[44px] px-1 ${
                    scrolled ? "text-text-main" : "text-white/90"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right utilities: language + CTA + Menu toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={toggleLanguage}
                className={`text-xs font-semibold px-3 py-2 min-h-[44px] rounded border transition-colors whitespace-nowrap inline-flex items-center justify-center ${
                  scrolled
                    ? "border-border-light text-text-main hover:bg-neutral-100"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {switchLabel}
              </button>

              <a
                href="#contact"
                className="hidden sm:inline-flex bg-accent hover:bg-accent-dark text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2.5 min-h-[44px] rounded transition-all duration-200 tracking-wide uppercase shadow-sm whitespace-nowrap items-center justify-center"
              >
                {ctaLabel}
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-3 min-h-[44px] min-w-[44px] rounded border focus:outline-none transition-colors inline-flex items-center justify-center whitespace-nowrap ${
                  scrolled
                    ? "border-border-light text-text-main bg-white hover:bg-neutral-100"
                    : "border-white/20 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                }`}
                aria-label={menuOpen ? (t("nav.menuClose") as string) : (t("nav.menuOpen") as string)}
              >
                <div className="w-5 h-4 flex flex-col justify-between pointer-events-none">
                  <span
                    className={`block h-0.5 w-full bg-current transition-transform duration-200 ${
                      menuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transition-opacity duration-200 ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transition-transform duration-200 ${
                      menuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile / Tablet / Desktop Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-bg-dark text-white flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-border-dark pb-5">
            <span className="font-display text-2xl font-bold tracking-tight text-white whitespace-nowrap">
              {brandWordmark}<span className="text-accent">.</span>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-white text-sm font-mono uppercase tracking-wider px-3 py-2 min-h-[44px] border border-white/20 rounded inline-flex items-center justify-center whitespace-nowrap"
              aria-label={t("nav.menuClose") as string}
            >
              {menuCloseLabel}
            </button>
          </div>

          <nav className="flex flex-col gap-2 my-auto">
            {allNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white/90 hover:text-accent transition-colors min-h-[44px] flex items-center whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-border-dark pt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-text-dim whitespace-nowrap">{langLabel}</span>
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setMenuOpen(false);
                }}
                className="text-xs font-bold text-accent px-3 py-2 min-h-[44px] border border-accent/40 rounded uppercase inline-flex items-center justify-center whitespace-nowrap"
              >
                {switchLabel}
              </button>
            </div>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="w-full bg-accent hover:bg-accent-dark text-white text-center py-3.5 min-h-[44px] rounded font-semibold text-sm tracking-wider uppercase inline-flex items-center justify-center whitespace-nowrap"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
