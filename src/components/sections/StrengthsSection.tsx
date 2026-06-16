import Reveal from "@/components/ui/Reveal";

const strengths = [
  {
    number: "01",
    title: "Spolupráce",
    description:
      "Ty nejlepší věci potřebují čas, tudíž i naše spolupráce — budeme dlouhodobě a pravidelně v kontaktu.",
  },
  {
    number: "02",
    title: "Dlouhodobá vize",
    description:
      "Nehraju na rychlé výhry. Buduju vztahy a bohatství, které přetrvají.",
  },
  {
    number: "03",
    title: "Propojování příležitostí",
    description:
      "Spojuji ty správné lidi, myšlenky a projekty k vzájemnému růstu.",
  },
];

export default function StrengthsSection() {
  return (
    <section className="snap-section min-h-[100dvh] bg-[#111111] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0 w-full">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <Reveal>
            <p className="text-[#c5a889] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Přístup
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-white max-w-2xl">
              Na čem stavím
              <br />
              <span className="text-[#c5a889]">spolupráci</span>
            </h2>
          </Reveal>
        </div>

        {/* Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden">
          {strengths.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.15}>
              <div className="bg-[#111111] p-10 lg:p-12 h-full">
                <span className="font-heading font-700 text-5xl text-white/10 block mb-6">
                  {item.number}
                </span>
                <h3 className="font-heading font-700 text-xl text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
