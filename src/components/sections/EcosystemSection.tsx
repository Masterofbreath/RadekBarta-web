import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { SOCIAL } from "@/lib/constants";
import { ArrowRightIcon } from "@/components/ui/Icons";

const cards = [
  {
    id: "investice",
    subtitle: "Investice",
    title: "Investiční zprostředkování",
    description:
      "Pomáhám klientům postavit robustní diverzifikovaná portfolia do jakékoliv doby. Od fyzického zlata a stříbra přes nemovitosti, kryptoměny až po permanentní portfolio. Získejte jednoduchý systém na růst vašeho bohatství.",
    cta: "Sjednat konzultaci",
    href: "/investice",
    external: false,
    accent: "#97724f",
    bg: "#111111",
    textColor: "text-white",
  },
  {
    id: "youtube",
    subtitle: "Osobní YouTube channel",
    title: "Radek Bárta",
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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-8 w-full">
        {/* Header */}
        <div className="mb-8 lg:mb-10">
          <Reveal>
            <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Ekosystém
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark">
              Moje projekty a podnikatelské aktivity
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
      className="group relative rounded-2xl lg:rounded-3xl p-10 lg:p-12 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-xl cursor-pointer h-full flex flex-col justify-between min-h-[300px]"
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
            {card.subtitle}
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
