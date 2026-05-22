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
    role: "Posluchač podcastu Principy růstu",
  },
  {
    quote: "Objevila jsem Vás zrovna ve chvíli, kdy jsem profesně i osobně přešlapovala na místě. Díky Vám jsem se dala na cestu seberozvoje a také si ucelila obrázek ohledně tvorby majetku a dlouhodobé vize. Věděla jsem toho sice už spoustu, ale až po poslechu Vašich podcastů mi to teprve vše docvaklo. Velký DÍK!!! ❤️",
    name: "Žena",
    role: "Posluchačka podcastu Principy růstu",
  },
  {
    quote: "Děláte absolutně skvělý podcast!!! Jsem opravdu rád, že jsem na něj před pár dny náhodou narazil. Vaše názory a myšlenky se mnou rezonují a snad se vším se ztotožňuji! Suprr práce 👍👍",
    name: "Muž",
    role: "Posluchač podcastu Principy růstu",
  },
  {
    quote: "Přidávám tip na super-nadupaný podcast; konkrétně díl o principech bohatství a zdravých návycích. Došlo mi při poslechu opravdu spousta souvislostí. Díky @magiezivota 🙏",
    name: "Sdílení na sociálních sítích",
    role: "Posluchač podcastu Principy růstu",
  },
  {
    quote: "Začal jsem vás nedávno poslouchat a pomohli jste mi s pár životními změnami. Moc vám za to chci poděkovat, dobře se vás poslouchá. Ještě jednou moc děkuji a v případě, že někdy budete v Praze, tak si s vámi velice rád zajdu na kávu. 😀",
    name: "Muž",
    role: "Posluchač podcastu Principy růstu",
  },
  {
    quote: "Začal jsem nedávno poslouchat váš podcast a je to super! Moc se mi líbí vaše myšlenky a hodně věcí mám v plánu si díky vám zavést do života. Odvádíte moc dobrou práci, mě baví vás poslouchat!",
    name: "Muž",
    role: "Posluchač podcastu Principy růstu",
  },
  {
    quote: "Děkuji za Vaše super Podcasty!!!! Pouštím si je při procházkách s kočárkem 🫶🌷.",
    name: "Žena",
    role: "Posluchačka podcastu Principy růstu",
  },
];

const kruhTestimonials: TestimonialItem[] = [
  {
    quote: "Mám po dnešku pocit, že jsem dnešní den využil fakt naplno. Opravdu, že vlastně od rána až doteďka to přesně bylo to, co jsem potřeboval. Poslouchal jsem sebe, poslouchal jsem vnitřek a bylo to skvělý. Takže moc děkuju za tenhle parádní den.",
    name: "Účastník",
    role: "Mužský kruh / retreat",
  },
  {
    quote: "Vnímám, že se tady vytvořila dneska úplně super extra atmosféra, že jsem tady měl pár krásných konverzací a že je tady prostředí důvěry a bezpečí. Člověk se může opravdu s kýmkoliv bavit na jakékoliv téma — ať už soukromí, vztahy, byznys, podnikání.",
    name: "Účastník",
    role: "Mužský kruh / retreat",
  },
  {
    quote: "Co mě hodně zaujalo, tak byla ranní rozcvička s Pozdravem slunci, co navázalo na velmi zajímavé téma vztahů. Na to navázala návštěva lesa. Bylo to hodně relaxační, až mě to překvapilo. Bylo příjemný pozorovat to spojení s tím lesem.",
    name: "Účastník",
    role: "Mužský kruh / retreat",
  },
  {
    quote: "Nikdy jsem nebyl zvyklej takhle s mužem sdílet takovýhle věci. Vůbec jsem se o tom nikdy nebavil s kamarádama nebo s rodinou. Jsem strašně rád, že teď se to tady s váma otvírá, že vlastně vím, že muži vůbec takhle mezi sebou komunikujou.",
    name: "Účastník",
    role: "Mužský kruh / retreat",
  },
  {
    quote: "Pro mě to byl dneska hodně dlouhej den, jedna z nejdelších sobot, co jsem v poslední době zažil. A je to i super uvědomění, že prostě člověk je pak vlastně i efektivnější a stihne toho víc.",
    name: "Účastník",
    role: "Mužský kruh / retreat",
  },
  {
    quote: "Mám pocit, že sme sa so všetkými z vás na určitej úrovni zblížili, a že to bolo hrozne rýchle a prirodzené. Tá spätná väzba, ktorá sa mi dostáva, prekonala moje očakávania. Ďakujem za to, vážim si to.",
    name: "Účastník (kuchař akce)",
    role: "Mužský kruh / retreat",
  },
  {
    quote: "Uvědomil jsem si, že vlastně nemám stanovený, co potřebuju. Potřebuju najít tu cestu zase k sobě, do toho středu, na čemž už pracuju. A myslím si, že aniž byste si to uvědomili, tak mi s tím docela pomáháte.",
    name: "Účastník",
    role: "Mužský kruh / retreat",
  },
  {
    quote: "Je to fakt úžasný pocit, takové té blaženosti, že jako muži si dokážem udělat prostor sami pro sebe. Tyhle akce chci rozhodně zažívat opakovaně, vracet se na místa do lesa, do přírody mimo to město. Každý, kdo bude mít chuť — rozhodně doporučuju.",
    name: "Účastník",
    role: "Mužský kruh / retreat",
  },
  {
    quote: "Jsem nadšenej z toho, že tady byl průvodce Josef, kterej nás vedl ať už fyzicky, tak i duševně. Moc mě to obohatilo. Vnímám, že i po stránce jídla, lidí, energie a tohohle krásnýho místa jsem nadšenej. Můžu to doporučit všem, kteří se chtějí podívat do sebe.",
    name: "Účastník",
    role: "Mužský kruh / retreat",
  },
];

function TreeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-6" />
      <path d="M9.5 16H6l4-5H7l5-6 5 6h-3l4 5h-3.5" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function CircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
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
    }, 6000);
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
            icon={<TreeIcon />}
            label="Investice"
            delay={0}
          />
          <RotatingCard
            items={podcastTestimonials}
            icon={<MicIcon />}
            label="Principy růstu"
            delay={0.12}
          />
          <RotatingCard
            items={kruhTestimonials}
            icon={<CircleIcon />}
            label="Kruh tvůrců"
            delay={0.24}
          />
        </div>
      </div>
    </section>
  );
}
