import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { SOCIAL } from "@/lib/constants";
import { ArrowRightIcon } from "@/components/ui/Icons";

const cards = [
  {
    id: "investice",
    label: "01",
    title: "Architektura bohatství",
    subtitle: "Investice",
    description:
      "Strategické plánování a diverzifikace. Od fyzického zlata a stříbra přes kryptoměny a nemovitosti až po permanentní portfolia. Získejte klid a kontrolu nad svou budoucností.",
    cta: "Sjednat konzultaci",
    href: "/investice",
    external: false,
    accent: "#97724f",
    bg: "#111111",
    textColor: "text-white",
  },
  {
    id: "kruh",
    label: "02",
    title: "Kruh tvůrců",
    subtitle: "Komunita",
    description:
      "Exkluzivní offline setkání a retreaty. Prostor pro vědomé tvůrce, sdílení know-how a budování pevných vztahů v inspirativním prostředí.",
    cta: "Zjistit termíny",
    href: "/kruh-tvurcu",
    external: false,
    accent: "#c5a889",
    bg: "#1c1510",
    textColor: "text-white",
  },
  {
    id: "principy",
    label: "03",
    title: "Principy růstu",
    subtitle: "YouTube Projekt",
    description:
      "Autentický pohled do světa úspěšných. Ukazujeme inovátory, podnikatele a tvůrce v jejich přirozeném prostředí — zachycujeme jejich byznys i domov.",
    cta: "Připojit se k růstu",
    href: SOCIAL.principyRustu,
    external: true,
    accent: "#97724f",
    bg: "#f6f6f6",
    textColor: "text-dark",
  },
  {
    id: "youtube",
    label: "04",
    title: "Radek Bárta",
    subtitle: "YouTube Channel",
    description:
      "Video tvorba o podnikání, technologiích, seberozvoji a investicích. Myšlenky a vhledy pro váš každodenní osobní i byznysový růst.",
    cta: "Přejít na YouTube",
    href: SOCIAL.youtube,
    external: true,
    accent: "#c5a889",
    bg: "#f0ebe5",
    textColor: "text-dark",
  },
];

export default function EcosystemSection() {
  return (
    <section id="ekosystem" className="snap-section min-h-[100dvh] bg-[#f6f6f6] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-16 w-full">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <Reveal>
            <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Ekosystém
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark max-w-lg">
              Moje projekty
              <br />
              a&nbsp;ekosystémy
            </h2>
          </Reveal>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {cards.map((card, index) => (
            <Reveal key={card.id} delay={index * 0.1}>
              <EcosystemCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemCard({ card }: { card: (typeof cards)[number] }) {
  const Inner = (
    <div
      className="group relative rounded-2xl lg:rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer h-full flex flex-col justify-between min-h-[260px]"
      style={{ backgroundColor: card.bg }}
    >
      {/* Subtle gradient blob */}
      <div
        className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-30"
        style={{ backgroundColor: card.accent }}
      />

      {/* Label */}
      <div className="flex items-start justify-between mb-auto">
        <div>
          <span
            className={`text-xs font-heading font-600 uppercase tracking-widest opacity-40 ${card.textColor}`}
          >
            {card.label} · {card.subtitle}
          </span>
          <h3 className={`font-heading font-700 text-2xl lg:text-3xl mt-2 leading-tight ${card.textColor}`}>
            {card.title}
          </h3>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: card.accent + "33" }}
        >
          <ArrowRightIcon
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: card.accent } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="mt-6">
        <p className={`text-sm leading-relaxed mb-6 opacity-60 ${card.textColor}`}>
          {card.description}
        </p>
        <span
          className="inline-flex items-center gap-2 text-sm font-heading font-semibold"
          style={{ color: card.accent }}
        >
          {card.cta}
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );

  if (card.external) {
    return (
      <a href={card.href} target="_blank" rel="noopener noreferrer">
        {Inner}
      </a>
    );
  }
  return <Link href={card.href}>{Inner}</Link>;
}
