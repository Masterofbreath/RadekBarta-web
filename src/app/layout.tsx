import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
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
  title: "Radek Bárta — Architekt bohatství, tvůrce obsahu",
  description:
    "Radek Bárta — průvodce na pomezí investic a vědomého růstu. Architektura bohatství, podcast Magie života, YouTube a komunita tvůrců.",
  keywords: [
    "Radek Bárta",
    "investice",
    "architektura bohatství",
    "Magie života",
    "Principy růstu",
    "finanční svoboda",
    "zlato stříbro investice",
  ],
  authors: [{ name: "Radek Bárta" }],
  openGraph: {
    title: "Radek Bárta — Architekt bohatství, tvůrce obsahu",
    description:
      "Průvodce na cestě za finanční i osobní svobodou. Investice, podcast, YouTube a komunita vědomých tvůrců.",
    url: "https://www.radekbarta.cz",
    siteName: "Radek Bárta",
    locale: "cs_CZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.radekbarta.cz",
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
        <main>{children}</main>
        <BottomNav />
        <Footer />
      </body>
    </html>
  );
}
