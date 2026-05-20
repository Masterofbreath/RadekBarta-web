import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import { CheckIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Investice & Architektura bohatství — Radek Bárta",
  description:
    "Strategické plánování a diverzifikace portfolia. Od fyzického zlata a stříbra přes kryptoměny a nemovitosti až po permanentní portfolia. Sjednejte konzultaci.",
};

const benefits = [
  "Osobní konzultace a analýza vaší situace",
  "Návrh diverzifikovaného portfolia na míru",
  "Investice do fyzického zlata a stříbra",
  "Kryptoměny a digitální aktiva s rozmyslem",
  "Nemovitosti jako pilíř dlouhodobého bohatství",
  "Permanentní portfolio pro klid v každé situaci",
  "Průběžná podpora a přizpůsobování strategie",
];

const steps = [
  {
    number: "01",
    title: "Úvodní konzultace",
    description:
      "Bezplatný 30minutový hovor, kde zjistíme vaši situaci, cíle a co vás přivádí k investování.",
  },
  {
    number: "02",
    title: "Analýza a strategie",
    description:
      "Na základě konzultace připravím personalizovanou strategii — od alokace aktiv po konkrétní kroky.",
  },
  {
    number: "03",
    title: "Implementace",
    description:
      "Společně uvedeme plán do praxe. Jsem s vámi v každém kroku — od prvního nákupu po průběžný review.",
  },
  {
    number: "04",
    title: "Průběžný monitoring",
    description:
      "Portfolio se přizpůsobuje vašemu životu. Pravidelně se potkáváme a plán aktualizujeme.",
  },
];

export default function InvesticePage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] bg-[#111111] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/investice-hero.jpg"
            alt="Architektura bohatství"
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <Reveal>
            <p className="text-[#c5a889] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-5">
              Investice · Architektura bohatství
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="font-heading font-800 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight mb-6 max-w-2xl">
              Budování
              <br />
              a ochrana
              <br />
              <span className="text-[#c5a889]">vašeho majetku</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-white/60 text-lg lg:text-xl leading-relaxed max-w-lg mb-10">
              Strategické plánování a diverzifikace. Od fyzického zlata a stříbra
              přes kryptoměny a nemovitosti až po permanentní portfolia. Získejte
              klid a kontrolu nad svou budoucností.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <a
              href="#konzultace"
              className="inline-flex items-center px-8 py-4 bg-[#97724f] text-white font-heading font-semibold rounded-full hover:bg-[#7a5c3e] transition-all duration-300 hover:scale-[1.02] text-sm"
            >
              Sjednat bezplatnou konzultaci
            </a>
          </Reveal>
        </div>
      </section>

      {/* Co nabízím */}
      <section className="bg-[#f6f6f6] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Reveal>
                <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
                  Co nabízím
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark mb-8">
                  Komplexní přístup
                  <br />
                  k vašemu bohatství
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-[#6b6b6b] text-lg leading-relaxed mb-10">
                  Nehraji na rychlé výhry. Buduji s vámi dlouhodobou strategii,
                  která odolá volatilitě trhů a přinese klid — ne pouze výnosy.
                </p>
              </Reveal>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <Reveal key={benefit} delay={0.25 + index * 0.06}>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#97724f]/10 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-3.5 h-3.5 text-[#97724f]" />
                      </div>
                      <span className="text-[#444] text-sm">{benefit}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Image placeholder */}
            <Reveal delay={0.3} direction="right">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#e8e5e2]">
                <Image
                  src="/images/investice-about.jpg"
                  alt="Radek Bárta — architektura bohatství"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Jak to funguje */}
      <section className="bg-[#111111] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-20">
            <Reveal>
              <p className="text-[#c5a889] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
                Průběh
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-white max-w-lg">
                Jak naše spolupráce
                funguje
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.1}>
                <div className="bg-white/5 rounded-2xl p-8 h-full border border-white/5 hover:border-[#c5a889]/30 transition-colors">
                  <span className="font-heading font-700 text-4xl text-white/10 block mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-heading font-700 text-lg text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kontaktní formulář */}
      <section id="konzultace" className="bg-[#f6f6f6] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <Reveal>
                <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
                  Kontakt
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark mb-6">
                  Začněme
                  <br />
                  <span className="text-[#97724f]">první hovor</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-md">
                  Bezplatná 30minutová konzultace. Nezávazně si povíme, kde jste,
                  kam chcete a jestli dává smysl pokračovat společně.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="right">
              <div className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-10 border border-[#e8e5e2]">
                <ContactForm
                  type="contact"
                  title="Sjednat konzultaci"
                  subtitle="Odpovím do 48 hodin a navrhneme termín."
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
