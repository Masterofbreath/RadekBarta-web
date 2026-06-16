import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stránka nenalezena",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[#c5a889] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
          404
        </p>
        <h1 className="font-heading font-700 text-4xl lg:text-6xl text-white leading-tight mb-6">
          Stránka
          <br />
          <span className="text-[#c5a889]">nenalezena.</span>
        </h1>
        <p className="text-white/50 text-lg leading-relaxed mb-10">
          Stránka, kterou hledáte, neexistuje nebo byla přesunuta.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#97724f] text-white font-heading font-semibold rounded-full hover:bg-[#7a5c3e] transition-colors text-sm"
          >
            Zpět na úvod
          </Link>
          <Link
            href="/investice#kontakt"
            className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-heading font-semibold rounded-full hover:bg-white/15 transition-colors text-sm"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
