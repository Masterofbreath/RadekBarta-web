import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import SnapController from "@/components/layout/SnapController";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.radekbarta.cz"),
  title: {
    default: "Radek Bárta — Investor, Podcaster, Průvodce za finanční svobodou",
    template: "%s — Radek Bárta",
  },
  description:
    "Radek Bárta — investor, podcaster a průvodce na cestě za finanční i osobní svobodou. Investice do zlata, stříbra, permanentního portfolia a nemovitostí. Podcast Magie života (160+ epizod).",
  keywords: [
    "Radek Bárta",
    "investice",
    "fyzické zlato",
    "fyzické stříbro",
    "permanentní portfolio",
    "investiční nemovitosti",
    "Magie života podcast",
    "Principy růstu",
    "finanční svoboda",
    "investiční zprostředkovatel",
    "Golden Gate finanční služby",
    "drahé kovy investice",
  ],
  authors: [{ name: "Radek Bárta", url: "https://www.radekbarta.cz" }],
  creator: "Radek Bárta",
  openGraph: {
    title: "Radek Bárta — Investor, Podcaster, Průvodce za finanční svobodou",
    description:
      "Pomáhám rodinám a podnikatelům budovat diverzifikovaná portfolia — fyzické drahé kovy, permanentní strategie, nemovitosti. 9+ let praxe, 500+ klientů.",
    url: "https://www.radekbarta.cz",
    siteName: "Radek Bárta",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "https://www.radekbarta.cz/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Radek Bárta — Investor, Podcaster, Podnikatel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radek Bárta — Investor & Podcaster",
    description:
      "Průvodce na cestě za finanční i osobní svobodou. Investice, podcast Magie života a vědomý růst.",
    images: ["https://www.radekbarta.cz/images/hero.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "váš-google-verification-code", // přidat po ověření GSC
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <head>
        {/* JSON-LD — Person + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Radek Bárta",
                url: "https://www.radekbarta.cz",
                image: "https://www.radekbarta.cz/images/hero.jpg",
                jobTitle: "Investor, Podcaster, Podnikatel",
                description:
                  "Radek Bárta je český investor a podcaster. Jako vázaný zástupce Golden Gate finanční služby, a.s. pomáhá rodinám a podnikatelům budovat diverzifikovaná investiční portfolia — od fyzických drahých kovů po permanentní strategie.",
                email: "radek@radekbarta.cz",
                telephone: "+420739758734",
                sameAs: [
                  "https://www.facebook.com/radek.bartaa",
                  "https://www.instagram.com/radek_barta",
                  "https://www.linkedin.com/in/radek-barta-155a3717b/",
                  "https://www.youtube.com/@radek_barta",
                  "https://www.youtube.com/@Principyrustu",
                ],
                knowsAbout: [
                  "Investice",
                  "Fyzické drahé kovy",
                  "Zlato a stříbro",
                  "Permanentní portfolio",
                  "Investiční nemovitosti",
                  "Finanční svoboda",
                  "Osobní rozvoj",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Radek Bárta",
                url: "https://www.radekbarta.cz",
                description:
                  "Průvodce na cestě za finanční i osobní svobodou. Investice, podcast Magie života a vědomý růst.",
                inLanguage: "cs",
                author: {
                  "@type": "Person",
                  name: "Radek Bárta",
                },
              },
            ]),
          }}
        />
        {/* Ecomail tracking */}
        <Script
          id="ecomail-tracker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              ;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
              p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
              };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
              n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","//d70shl7vidtft.cloudfront.net/ecmtr-2.4.2.js","ecotrack"));
              window.ecotrack('newTracker', 'cf', 'd2dpiwfhf3tz0r.cloudfront.net', {
                appId: 'radekbarta', consentModeV2: true
              });
              window.ecotrack('setUserIdFromLocation', 'ecmid');
              window.ecotrack('trackPageView');
            `,
          }}
        />
        {/* GTM placeholder — add GTM-XXXXXX when ready */}
        {/* <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `...` }} /> */}
      </head>
      <body className="font-body antialiased bg-cream text-dark">
        <Navigation />
        <SnapController />
        <div className="page-scroll-container">
          <main>{children}</main>
          <Footer />
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
