import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import InvesticeHero from "@/components/sections/InvesticeHero";
import TestimonialsSlider from "@/components/ui/TestimonialsSlider";

export const metadata: Metadata = {
  title: "Investice · Tvorba bohatství — Radek Bárta",
  description:
    "Permanentní portfolio s neochvějnými základy. Od akcií, nemovitostí až po zlato. Investiční systém prověřen 40+ lety. Sjednejte bezplatnou konzultaci s Radkem Bártou.",
};

const services = [
  {
    title: "Potkáme se osobně nebo online",
    items: [
      {
        name: "Analýza a strategie",
        desc: "Poznám vaši situaci a navrhneme portfolio na míru.",
      },
      {
        name: "Prezentace investiční strategie",
        desc: "která chrání a zhodnocuje majetek za každého počasí.",
      },
    ],
  },
  {
    title: "Reálná aktiva",
    items: [
      {
        name: "Drahé kovy",
        desc: "Fyzické zlato a stříbro jako kotva vaší finanční jistoty.",
      },
      {
        name: "Nemovitosti a financování",
        desc: "Chytré využití úvěrů a hypoték pro budování dlouhodobého bohatství.",
      },
    ],
  },
  {
    title: "Investiční fondy",
    items: [
      {
        name: "Permanentní fond",
        desc: "Investiční systém prověřený desetiletími, který chrání a zhodnocuje váš majetek za jakéhokoliv ekonomického počasí.",
      },
      {
        name: "Dragon fond",
        desc: "Dynamické investiční řešení pro nové podmínky na globálním trhu. Dostupné pouze pro bonitní klientelu — investice od 1 milionu Kč.",
      },
    ],
  },
  {
    title: "Partnerství",
    items: [
      {
        name: "Průběžná podpora",
        desc: "Váš život se mění, vaše strategie se mění s ním. Jsme v tom spolu.",
      },
      {
        name: "Prověření profesionálové",
        desc: "Spolupracuji výhradně s prověřenými profesionály, kteří disponují potřebnými licencemi a hlubokou odbornou znalostí trhu.",
      },
    ],
  },
];

const steps = [
  {
    number: "01",
    title: "Úvodní konzultace",
    description:
      "Bezplatný hovor, kde zjistíme vaši situaci, cíle a co vás přivádí k investování.",
  },
  {
    number: "02",
    title: "Analýza a strategie",
    description:
      "Na základě konzultace připravím personalizovanou strategii — od alokace aktiv po konkrétní kroky.",
  },
  {
    number: "03",
    title: "První investice",
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

const investiceTestimonials = [
  {
    name: "Gabriela Valentová",
    role: "Klient, obchodní partner",
    quote:
      "S Radkem Bártou spolupracuji v oblasti financí a musím říct, že mi úplně změnil pohled na peníze, spoření i investování. Díky jeho radám jsem se naučila lépe pracovat se svými financemi, začala pravidelně spořit a zároveň své peníze i chytře zhodnocovat. Nejvíc si vážím toho, že mi pomohl nastavit cestu k tomu, abych si jednou mohla splnit svůj sen o vlastním bydlení. Radek je člověk, který své práci opravdu rozumí, vše vysvětlí lidsky, s klidem a bez zbytečného tlaku. Má obrovský přehled a zároveň lidský přístup, který je dnes opravdu vzácný. Doporučuji ho všemi deseti.",
  },
  {
    name: "Karel Zálešák",
    role: "Klient",
    quote:
      "S Radkem jsem se seznámil před pár lety na jednom speciálním pobytu zaměřeném na osobnostní rozvoj. Domluvili jsme se, že mně pomůže s nastavením finančního portfolia a investováním a byla to skvělá volba. Radkův přístup je profesionální a příkladný, schůzky s ním mají vysokou úroveň. Líbí se mně na něm jeho celkový přístup k životu, jak v profesní tak osobní oblasti a jeho neustálá snaha se zdokonalovat ve všech sférách lidského bytí. Spolupráci s tímto moudrým, mladým mužem s radostí doporučuji.",
  },
  {
    name: "Michal Kršňák",
    role: "Obchodní partner",
    quote:
      "K Radkovi jsem se dostal přes jeho vzdělávací obsah na sociálních sítích, kterým inspiruje a pomáhá lidem udělat první kroky k finanční gramotnosti i osobnímu růstu. Netrvalo dlouho a z klienta jsem se stal spolupracovníkem. Doporučuji.",
  },
  {
    name: "Pavel Krasl",
    role: "Klient",
    quote:
      "Zasvetil me do sveta financi, penez, investic, udrzitele hodnot, inflace apod. Vse od zacatku az do konce, jak co spolu souvisi a jak co funguje. Za tech 5 let nam stribro vzrostlo o 130% a zlato o 100%. O tom vsem uz Vam muze povedet Radek :)",
  },
  {
    name: "Petr Janků",
    role: "Klient",
    quote:
      "Spolupráci s Radkem mohu doporučit — milý, vlídný a vstřícný. Na každý dotaz odpoví do několika hodin, vše pečlivě vysvětlí a doporučí, jak nejlépe postupovat. Díky jeho spolupráci s GG jsem se dostal k investování do zlata a stříbra, po kterém jsem toužil mít v portfoliu.",
  },
  {
    name: "Tomáš Tiurin",
    role: "Klient",
    quote:
      "S Radkem jsem se poprvé setkal ještě dříve, než jsme spolu začali oficiálně spolupracovat – skrze podcast Magie života. Postupně jsme spolu začali budovat moje investiční portfolio a později jsme navázali spolupráci i s jeho kolegou v oblasti investic do nemovitostí. Oceňuji jejich profesionální a zároveň velmi individuální přístup, který se jen tak nevidí. Pokud hledáte spolehlivého, lidského a zároveň odborně silného finančního poradce, Radka můžu jedině doporučit.",
  },
  {
    name: "Jiří Kříž",
    role: "Klient",
    quote:
      "Radek je člověk, kterého finance a vše s tím spojené evidentně baví, a proto s ním rád obchoduji. Doporučuji jeho služby s klidným svědomím.",
  },
  {
    name: "Barbora Mňuková",
    role: "Klient",
    quote:
      "Jsem ráda, že jsem měla možnost získat bližší informace k tomu, jak nakládat se svými penězi a využít tak možnosti spolupráce. Svět investování pro mne byl cizím a díky dobře podaným informacím jsem se začala lépe orientovat i v této oblasti. Velmi mi vyhovuje lidský a individuální přístup s možnostmi osobní i on-line komunikace. Vřele doporučuji, pokud Vás tato oblast zajímá.",
  },
  {
    name: "Mgr. Jana M. Ph.D.",
    role: "Klient",
    quote:
      'O investovanie som sa začala zaujímať pred pár rokmi, prešla viacerými pádmi, "chybami", až som si povedala dosť. Začala som sa viac vzdelávať a narazila na Radka a projekt Principy růstu. Od prvej chvíle mi bolo všetko vysvetlené a zodpovedaná každá otázka. Prístup je veľmi ľudský, priateľský, a zároveň veľmi odborný a profesionálny. Diverzifikovali sme riziká, nastavili portfólio, dozvedela som sa mnoho o investovaní. Som nesmierne vďačná, že som na tento projekt narazila.',
  },
  {
    name: "Adéla Třetinová",
    role: "Klient",
    quote:
      "Jsem ráda, že jsem se rozhodla investovat a umět tak suprově spravovat své finance. Bylo mi všechno dobře vysvětleno a i já, která investování vůbec nerozuměla, tak jsem všechno pochopila, plus mě to začalo dost bavit! Je to super pocit, když vím, že mám zajištěnou budoucnost. A ještě lepší je to, když se mám na koho obrátit a vždy dostanu rady, tipy, vhledy a taky podporu.",
  },
];

export default function InvesticePage() {
  return (
    <div>
      {/* Hero — stejný layout jako homepage */}
      <InvesticeHero />

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
                  Pomáhám rodinám i podnikatelům najít klid v nejisté době —
                  nabízím jedinečnou kombinaci investic, které jsou prověřeny
                  časem.
                </p>
              </Reveal>

              {/* 4 skupiny se sub-odrážkami */}
              <div className="space-y-6">
                {services.map((service, index) => (
                  <Reveal key={service.title} delay={0.25 + index * 0.08}>
                    <div className="border-l-2 border-[#c5a889]/40 pl-5">
                      <h3 className="font-heading font-700 text-dark text-base lg:text-lg mb-2">
                        {service.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {service.items.map((item) => (
                          <li key={item.name} className="text-[#555] text-sm leading-relaxed">
                            <span className="font-600 text-dark">{item.name}</span>
                            {" — "}
                            {item.desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Tři ikony stacked pod sebou */}
            <Reveal delay={0.3} direction="right">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="relative flex-1">
                    <Image
                      src="/images/icon-analysis.png"
                      alt="Analýza investic"
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 80vw, 40vw"
                    />
                  </div>
                  <div className="relative flex-1">
                    <Image
                      src="/images/icon-bank.png"
                      alt="Reálná aktiva"
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 80vw, 40vw"
                    />
                  </div>
                  <div className="relative flex-1">
                    <Image
                      src="/images/icon-handshake.png"
                      alt="Partnerství"
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 80vw, 40vw"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Průběh: Jak naše spolupráce funguje */}
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
                <br />
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

      {/* Reference — horizontální slider */}
      <section className="bg-[#f6f6f6] py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <Reveal>
            <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Reference
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark max-w-lg">
              Co říkají klienti
              <br />
              o naší spolupráci
            </h2>
          </Reveal>
        </div>

        {/* Horizontální auto-scrollovatelný slider */}
        <TestimonialsSlider testimonials={investiceTestimonials} />
      </section>

      {/* Kontaktní formulář */}
      <section id="konzultace" className="bg-white py-24 lg:py-32">
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
                  Rád vás provedu
                  <br />
                  celým procesem,
                  <br />
                  <span className="text-[#97724f]">můžeme začít?</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-3">
                  <p className="font-heading font-700 text-dark text-base">
                    Bezplatná hodinová konzultace
                  </p>
                  <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-md">
                    Projdeme vaši aktuální situaci, vaše cíle a vizi. Zjistíme,
                    zda jsme na stejné vlně a jestli dává smysl spolupracovat
                    na budování vašeho majetku.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="right">
              <div className="bg-[#f6f6f6] rounded-2xl lg:rounded-3xl p-8 lg:p-10 border border-[#e8e5e2]">
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
