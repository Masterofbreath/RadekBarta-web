import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obchodní podmínky — Radek Bárta",
};

export default function ObchodniPodminkyPage() {
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-6 lg:px-12">
      <h1 className="font-heading font-700 text-4xl text-dark mb-4">
        Obchodní podmínky
      </h1>
      <p className="text-[#6b6b6b] text-lg mb-10">
        Aktualizováno: 2026
      </p>
      <div className="prose prose-lg max-w-none text-[#444]">
        <p>
          Tato stránka bude obsahovat obchodní podmínky. Obsah připravíme před
          spuštěním webu.
        </p>
      </div>
    </div>
  );
}
