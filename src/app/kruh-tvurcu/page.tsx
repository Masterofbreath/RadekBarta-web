import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Kruh tvůrců — Radek Bárta",
  description:
    "Exkluzivní offline setkání a retreaty pro vědomé tvůrce. Prostor pro sdílení know-how a budování pevných vztahů v inspirativním prostředí.",
};

const pillars = [
  {
    icon: "🤝",
    title: "Autentické vztahy",
    description:
      "Setkáváme se offline, tváří v tvář. Budujeme vztahy, které přetrvají — ne jen LinkedIn kontakty.",
  },
  {
    icon: "💡",
    title: "Sdílení know-how",
    description:
      "Každý přináší svůj pohled, zkušenosti a znalosti. Učíme se navzájem v bezpečném prostředí.",
  },
  {
    icon: "🌱",
    title: "Vědomý růst",
    description:
      "Zaměřujeme se na dlouhodobý rozvoj — osobní, byznysový i finanční. Bez zkratek.",
  },
  {
    icon: "🔥",
    title: "Inspirativní prostředí",
    description:
      "Výběr míst a formátů není náhoda. Prostředí vytváří atmosféru, která otevírá mysl.",
  },
];

export default function KruhTvurcuPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] bg-[#1c1510] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/kruh-hero.jpg"
            alt="Kruh tvůrců"
            fill
            priority
            className="object-cover object-center opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1510] via-[#1c1510]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <Reveal>
            <p className="text-[#c5a889] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-5">
              Exkluzivní komunita · Offline setkání
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="font-heading font-800 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight mb-6 max-w-2xl">
              Kruh
              <br />
              <span className="text-[#c5a889]">tvůrců</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-white/60 text-lg lg:text-xl leading-relaxed max-w-lg mb-10">
              Exkluzivní offline setkání a retreaty. Prostor pro vědomé tvůrce,
              sdílení know-how a budování pevných vztahů v inspirativním
              prostředí. Nejde o networking — jde o hloubku.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <a
              href="#prihlasit"
              className="inline-flex items-center px-8 py-4 bg-[#97724f] text-white font-heading font-semibold rounded-full hover:bg-[#7a5c3e] transition-all duration-300 hover:scale-[1.02] text-sm"
            >
              Chci vědět více
            </a>
          </Reveal>
        </div>
      </section>

      {/* Co je Kruh tvůrců */}
      <section className="bg-[#f6f6f6] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Reveal>
                <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
                  O projektu
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark mb-6">
                  Místo, kde se
                  <br />
                  věci skutečně
                  <br />
                  <span className="text-[#97724f]">dějí</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-[#6b6b6b] text-lg leading-relaxed mb-6">
                  Kruh tvůrců není další networking event. Je to záměrně malá,
                  pečlivě sestavená skupina lidí, kteří tvoří — ať už byznys,
                  obsah, komunitu nebo sami sebe.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-[#6b6b6b] text-lg leading-relaxed">
                  Potkáváme se offline, v inspirativních prostorách a přírodě.
                  Sdílíme, co funguje i co nefunguje. Budujeme vztahy, které
                  přetrvají roky — ne vizitky, které zmizí v šuplíku.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3} direction="right">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#e8e5e2]">
                <Image
                  src="/images/kruh-about.jpg"
                  alt="Kruh tvůrců — setkání"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 pilíře */}
      <section className="bg-[#111111] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <Reveal>
              <p className="text-[#c5a889] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
                Pilíře
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-white max-w-lg">
                Na čem
                Kruh stojí
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.1}>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-[#c5a889]/20 transition-colors h-full">
                  <span className="text-3xl mb-5 block">{pillar.icon}</span>
                  <h3 className="font-heading font-700 text-xl text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section id="prihlasit" className="bg-[#f6f6f6] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <Reveal>
                <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
                  Mám zájem
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark mb-6">
                  Nechte nám
                  <br />
                  na sebe kontakt
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-md">
                  Přečetli jste si dost? Pokud vás Kruh tvůrců oslovil a chcete
                  dostat informace o nejbližší události, zanechte nám svůj
                  kontakt. Ozveme se s podrobnostmi.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 bg-[#e8e5e2] rounded-2xl p-6">
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">
                    <span className="font-semibold text-dark">Jak to funguje:</span>
                    {" "}Vyplníte formulář → Radek dostane váš kontakt →
                    Dostanete mail s termínem a detaily nejbližšího setkání.
                    Žádné závazky, jen informace.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} direction="right">
              <div className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-10 border border-[#e8e5e2]">
                <ContactForm
                  type="lead"
                  title="Chci vědět více"
                  subtitle="Zanechte nám kontakt a dostanete info o nejbližší události."
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
