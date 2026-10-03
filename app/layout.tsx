import { FormBridge } from "@/components/form-bridge";
import { MotionLayer } from "@/components/motion-layer";
import "./motion-layer.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "McRich Studio — Lynraske nettsider i Framer & Webflow | Oslo",
  description: "Webdesign- og utviklingsstudio i Oslo. Nøkkelferdige nettsider for B2B og vekstselskaper levert på 10–14 dager til fastpris med 100 % WCAG 2.1 AA tilgjengelighetsgaranti.",
  keywords: ["webdesign oslo", "framer utvikler oslo", "webflow norge", "wcag 2.1 tilgjengelighet", "nettside b2b oslo", "vipps integrasjon nettside"],
  openGraph: {
    title: "McRich Studio — Nøkkelferdige B2B-nettsider til fastpris i Oslo",
    description: "Lansering på 10–14 dager uten byråbyråkrati. 90+ PageSpeed, universell utforming og direkte kontakt med utvikler.",
    type: "website",
    locale: "nb_NO",
  },
  icons: {
    icon: `${process.env.SITE_BASE_PATH ?? ""}/icon.svg`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html style={{ "--motion-duration": "1s", "--motion-stagger": "0.09s", "--motion-shift": "24px", "--motion-ease": "cubic-bezier(0.16, 1, 0.3, 1)" } as React.CSSProperties} lang="no" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,500;0,600;0,700;1,600&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
              <script type="application/ld+json">{"{\"@context\":\"https://schema.org\",\"@type\":\"ProfessionalService\",\"name\":\"McRich Studio\",\"description\":\"McRich Studio — студія вебдизайну та розробки в Осло, яка створює надшвидкі сайти на Framer і Webflow для B2B-компаній та амбітних стартапів. Проєкти здаються за фіксованою вартістю під ключ із гарантованою відповідністю норвезьким стандартам доступності WCAG 2.1 AA. Робота ведеться напряму з розробником, що забезпечує запуск готового вебресурсу без агентської бюрократії всього за 14 днів.\",\"email\":\"ishop.inform@gmail.com\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Осло\",\"addressCountry\":\"no\"},\"makesOffer\":[{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"Konverteringsfokuserte Framer-landingssider\"}},{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"Skalerbare B2B-bedriftsnettsider i Webflow\"}},{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"Universell utforming og WCAG 2.1 AA-revisjon\"}},{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"Migrering fra treg WordPress til Framer\"}},{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"Integrasjon med Vipps, Fiken og Tripletex\"}},{\"@type\":\"Offer\",\"itemOffered\":{\"@type\":\"Service\",\"name\":\"Core Web Vitals \\u0026 Lokal Oslo-SEO\"}}]}"}</script>
              <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="min-h-screen bg-bg-light text-text-main antialiased selection:bg-accent selection:text-white">
        <LocaleProvider>{children}</LocaleProvider>
      <SmoothScroll />  <MotionLayer />
        <FormBridge endpoint="https://rapier.46.225.105.129.sslip.io/api/site-forms/cmuqsvtox012lzuwkgukyblid.965620d5c9198f32d2d9f4f284d3343504daeb87c6da9153083e33f0f3d276d8" />
      </body>
    </html>
  );
}
