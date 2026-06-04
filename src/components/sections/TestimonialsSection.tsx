"use client";

import { useState, useEffect, useCallback } from "react";
import Reveal from "@/components/ui/Reveal";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

const investiceTestimonials: TestimonialItem[] = [
  {
    quote: "S Radkem Bártou spolupracuji v oblasti financí a musím říct, že mi úplně změnil pohled na peníze, spoření i investování. Díky jeho radám jsem se naučila lépe pracovat se svými financemi a začala pravidelně spořit a zároveň chytře zhodnocovat. Radek je člověk, který své práci opravdu rozumí, vše vysvětlí lidsky, s klidem a bez zbytečného tlaku. Doporučuji ho všemi deseti.",
    name: "Gabriela Valentová",
    role: "Klient, obchodní partner",
  },
  {
    quote: "Domluvili jsme se, že mi pomůže s nastavením finančního portfolia a investováním a byla to skvělá volba. Radkův přístup je profesionální a příkladný, schůzky s ním mají vysokou úroveň. Líbí se mi na něm jeho celkový přístup k životu — jak v profesní, tak osobní oblasti. Spolupráci s tímto moudrým mladým mužem s radostí doporučuji.",
    name: "Karel Zálešák",
    role: "Klient",
  },
  {
    quote: "K Radkovi jsem se dostal přes jeho vzdělávací obsah na sociálních sítích, kterým inspiruje a pomáhá lidem udělat první kroky k finanční gramotnosti i osobnímu růstu. Netrvalo dlouho a z klienta jsem se stal spolupracovníkem. Doporučuji.",
    name: "Michal Kršňák",
    role: "Obchodní partner",
  },
  {
    quote: "Zasvetil me do sveta financi, penez, investic, udrzitelnych hodnot, inflace apod. Vse od zacatku az do konce, jak co spolu souvisi a jak co funguje. Za tech 5 let nam stribro vzrostlo o 130 % a zlato o 100 %. O tom vsem uz Vam muze povedet Radek :)",
    name: "Pavel Krasl",
    role: "Klient",
  },
  {
    quote: "Spolupráci s Radkem mohu doporučit — milý, vlídný a vstřícný. Na každý dotaz odpoví do několika hodin, vše pečlivě vysvětlí a doporučí, jak nejlépe postupovat. Díky jeho spolupráci jsem se dostal k investování do zlata a stříbra, po kterém jsem toužil.",
    name: "Petr Janků",
    role: "Klient",
  },
  {
    quote: "S Radkem jsem se poprvé setkal skrze podcast Magie života. Postupně jsme spolu začali budovat moje investiční portfolio. Oceňuji jejich profesionální a zároveň velmi individuální přístup, který se jen tak nevidí. Pokud hledáte spolehlivého, lidského a zároveň odborně silného finančního poradce, Radka můžu jedině doporučit.",
    name: "Tomáš Tiurin",
    role: "Klient",
  },
  {
    quote: "Radek je člověk, kterého finance a vše s tím spojené evidentně baví, a proto s ním rád obchoduji. Doporučuji jeho služby s klidným svědomím.",
    name: "Jiří Kříž",
    role: "Klient",
  },
  {
    quote: "Svět investování pro mne byl cizím a díky dobře podaným informacím jsem se začala lépe orientovat i v této oblasti. Velmi mi vyhovuje lidský a individuální přístup s možnostmi osobní i online komunikace. Vřele doporučuji.",
    name: "Barbora Mňuková",
    role: "Klient",
  },
  {
    quote: "Od prvej chvíle mi bolo všetko vysvetlené a zodpovedaná každá otázka. Prístup je veľmi ľudský, priateľský, a zároveň odborný a profesionálny. Diverzifikovali sme riziká, nastavili portfólio. Som nesmierne vďačná, že som na tento projekt narazila.",
    name: "Mgr. Jana M., Ph.D.",
    role: "Klient",
  },
  {
    quote: "Bylo mi všechno dobře vysvětleno a i já, která investování vůbec nerozuměla, jsem všechno pochopila, plus mě to začalo dost bavit! Je to super pocit, když vím, že mám zajištěnou budoucnost.",
    name: "Adéla Třetinová",
    role: "Klient",
  },
  {
    quote: "V této těžké době, kdy se inflace dotýká nás všech, je důležité vědět, jak pracovat se svými penězi — a tahle parta ví, jak vám může pomoci. Od samého začátku mi bylo všechno dobře vysvětleno. Mohu jedině doporučit.",
    name: "David Lžičař",
    role: "Klient",
  },
];

const podcastTestimonials: TestimonialItem[] = [
  {
    quote: "Před pár dny jsem narazil na Vaše podcasty! Chci Vám ze srdce úplně nejvíc poděkovat ❤️ Neskutečně mě inspirujete a obohacujete Vašimi podcasty — vědomě se připravuju na změnu, co se týče přístupu k mým financím a celkovému směřování. Jste nejlepší 🙌📈",
    name: "Muž",
    role: "Podcast",
  },
  {
    quote: "Objevila jsem Vás zrovna ve chvíli, kdy jsem profesně i osobně přešlapovala na místě. Díky Vám jsem se dala na cestu seberozvoje a také si ucelila obrázek ohledně tvorby majetku a dlouhodobé vize. Věděla jsem toho sice už spoustu, ale až po poslechu Vašich podcastů mi to teprve vše docvaklo. Velký DÍK!!! ❤️",
    name: "Žena",
    role: "Podcast",
  },
  {
    quote: "Děláte absolutně skvělý podcast!!! Jsem opravdu rád, že jsem na něj před pár dny náhodou narazil. Vaše názory a myšlenky se mnou rezonují a snad se vším se ztotožňuji! Suprr práce 👍👍",
    name: "Muž",
    role: "Podcast",
  },
  {
    quote: "Přidávám tip na super-nadupaný podcast; konkrétně díl o principech bohatství a zdravých návycích. Došlo mi při poslechu opravdu spousta souvislostí. Díky @magiezivota 🙏",
    name: "Sdílení na sociálních sítích",
    role: "Podcast",
  },
  {
    quote: "Začal jsem vás nedávno poslouchat a pomohli jste mi s pár životními změnami. Moc vám za to chci poděkovat, dobře se vás poslouchá. Ještě jednou moc děkuji a v případě, že někdy budete v Praze, tak si s vámi velice rád zajdu na kávu. 😀",
    name: "Muž",
    role: "Podcast",
  },
  {
    quote: "Začal jsem nedávno poslouchat váš podcast a je to super! Moc se mi líbí vaše myšlenky a hodně věcí mám v plánu si díky vám zavést do života. Odvádíte moc dobrou práci, mě baví vás poslouchat!",
    name: "Muž",
    role: "Podcast",
  },
  {
    quote: "Děkuji za Vaše super Podcasty!!!! Pouštím si je při procházkách s kočárkem 🫶🌷.",
    name: "Žena",
    role: "Podcast",
  },
];

const kruhTestimonials: TestimonialItem[] = [
  {
    quote: "Mám pocit, že jsem ten čas využil opravdu naplno. Od rána až do noci to bylo přesně to, co jsem v danou chvíli potřeboval – zpomalit, poslouchat svůj vnitřní hlas a být stoprocentně přítomný. Byl to parádní čas, který jsem si s ostatními neskutečně užil.",
    name: "Účastník",
    role: "Kruh tvůrců / retreat",
  },
  {
    quote: "Chci poděkovat každému, kdo v kruhu byl. Vytvořila se tam neuvěřitelná atmosféra extra důvěry a bezpečí. Člověk mohl otevřít jakékoliv téma – od nejhlubšího soukromí a vztahů až po tvrdý byznys a podnikání – a věděl, že ho ostatní bez odsuzování slyší.",
    name: "Účastník",
    role: "Kruh tvůrců / retreat",
  },
  {
    quote: "Ranní rozcvička s pozdravem slunci skvěle otevřela hluboké téma osobních vztahů a toho, co v nich reálně potřebujeme. Následný odchod do lesa mě svou hlubokou, relaxační silou až překvapil. To vědomé spojení s přírodou mě totálně zasáhlo.",
    name: "Účastník",
    role: "Kruh tvůrců / retreat",
  },
  {
    quote: "Nikdy jsem nebyl zvyklý sdílet své vnitřní věci s jinými muži. S kamarády ani s rodinou jsem to neotevíral, bylo to pro mě tabu. Jsem neskutečně vděčný, že jsem vystoupil ze své běžné bubliny a zjistil, jak hluboce a otevřeně spolu muži dokážou komunikovat. Našel jsem lidi, kteří přemýšlí stejně jako já.",
    name: "Účastník",
    role: "Kruh tvůrců / retreat",
  },
  {
    quote: "Byl to neuvěřitelně naplněný čas. Zažil jsem jeden z nejdelších a nejvíc obohacujících dnů za poslední roky. Odvážím si silné uvědomění, že když člověk na chvíli zastaví chaos a získá focus, je pak v běžném životě daleko efektivnější a zvládne víc.",
    name: "Účastník",
    role: "Kruh tvůrců / retreat",
  },
  {
    quote: "Bolo fascinujúce sledovať celú túto skupinu. S každým jedným z vás som pocítil rýchle a úplne prirodzené prepojenie. Mojím zámerom bolo, aby jedlo nebolo len obyčajným palivom, ale skutočným zážitkom pre zmysly a dušu. Spätná väzba, ktorú som dostal, totálne prekonala moje očakávania.",
    name: "Účastník (kuchár akcie)",
    role: "Kruh tvůrců / retreat",
  },
  {
    quote: "Uvědomil jsem si, že vlastně nemám jasně definované, co v životě opravdu potřebuju. Našel jsem tu cestu zpátky k sobě, do svého středu – a síla celého kruhu mi v tom, aniž by si to kluci vůbec uvědomovali, obrovsky pomohla.",
    name: "Účastník",
    role: "Kruh tvůrců / retreat",
  },
  {
    quote: "Sedím na louce, vstřebávám všechno, co jsme zažili, a normálně nenacházím slova. Je to čistá blaženost. To, že si dokážeme udělat čas sami na sebe, odjet z města hluboko do přírody a otevřeně sdílet své životy, je úžasné. Tuhle akci chci zažívat opakovaně.",
    name: "Účastník",
    role: "Kruh tvůrců / retreat",
  },
  {
    quote: "Jsem nadšený z celého konceptu – od skvělých průvodců, přes špičkové jídlo a energii lidí až po magické místo v přírodě. Pro mě to byla ta nejkrásnější, nejvíce smysluplná dovolená. Doporučuji to každému, kdo se chce podívat do svého nitra, odpočinout si a ujasnit si, kým vlastně je.",
    name: "Účastník",
    role: "Kruh tvůrců / retreat",
  },
];

function GrowthChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {/* Rising line chart */}
      <polyline points="3 17 8 11 13 14 21 5" />
      {/* Arrow tip on the line */}
      <polyline points="17 5 21 5 21 9" />
      {/* Axis bottom */}
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}

function StudioMicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Capsule body — wider, flatter, studio condenser style */}
      <rect x="8" y="2" width="8" height="13" rx="4" />
      {/* Horizontal lines suggesting mic grille */}
      <line x1="8.5" y1="7" x2="15.5" y2="7" />
      <line x1="8.5" y1="10" x2="15.5" y2="10" />
      {/* Stand arm */}
      <path d="M4 15c0 4.418 3.582 8 8 8" strokeDasharray="0" />
      <path d="M20 15c0 4.418-3.582 8-8 8" />
      {/* Base */}
      <line x1="12" y1="23" x2="12" y2="23" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function CommunityCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {/* Centre person */}
      <circle cx="12" cy="9" r="2.5" />
      <path d="M7.5 19c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" />
      {/* Left person */}
      <circle cx="5" cy="8" r="1.8" />
      <path d="M1.5 17.5c0-1.933 1.567-3.5 3.5-3.5" />
      {/* Right person */}
      <circle cx="19" cy="8" r="1.8" />
      <path d="M22.5 17.5c0-1.933-1.567-3.5-3.5-3.5" />
    </svg>
  );
}

interface RotatingCardProps {
  items: TestimonialItem[];
  icon: React.ReactNode;
  label: string;
  delay?: number;
}

function RotatingCard({ items, icon, label, delay = 0 }: RotatingCardProps) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback(
    (index: number) => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(index);
        setVisible(true);
      }, 280);
    },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % items.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [current, goTo, items.length]);

  const item = items[current];

  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-10 flex flex-col border border-[#e8e5e2] hover:border-[#c5a889] transition-colors duration-300 min-h-[420px]">
        {/* Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-[#c5a889]/10 flex items-center justify-center shrink-0 text-[#c5a889]">
            {icon}
          </div>
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-[#97724f]">
            {label}
          </span>
        </div>

        {/* Rotating content */}
        <div
          className="flex-1 flex flex-col transition-opacity duration-[280ms] ease-in-out"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <p className="text-[#1a1a1a] text-base leading-relaxed flex-1 mb-6">
            {item.quote}
          </p>
          <div className="border-t border-[#e8e5e2] pt-5">
            <p className="font-heading font-600 text-dark text-sm">{item.name}</p>
            <p className="text-[#6b6b6b] text-xs mt-1">{item.role}</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 mt-5 flex-wrap">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Reference ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === current
                  ? "bg-[#c5a889] w-5"
                  : "bg-[#e8e5e2] w-1.5 hover:bg-[#c5a889]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="snap-section min-h-[100dvh] bg-[#f6f6f6] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0 w-full">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <Reveal>
            <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Reference
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark">
              Co o spolupráci
              <br />
              říkají ostatní
            </h2>
          </Reveal>
        </div>

        {/* 3 rotating columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RotatingCard
            items={investiceTestimonials}
            icon={<GrowthChartIcon />}
            label="Investice"
            delay={0}
          />
          <RotatingCard
            items={podcastTestimonials}
            icon={<StudioMicIcon />}
            label="Podcast"
            delay={0.12}
          />
          <RotatingCard
            items={kruhTestimonials}
            icon={<CommunityCircleIcon />}
            label="Kruh tvůrců"
            delay={0.24}
          />
        </div>
      </div>
    </section>
  );
}
