import Reveal from "@/components/ui/Reveal";

const testimonials = [
  {
    quote:
      "Já z celýho srdce upřímně děkuju.. Objevila jsem Vás zrovna ve chvíli, kdy jsem profesně i osobně přešlapovala na místě. Díky Vám jsem se dala na cestu seberozvoje a také si ucelila obrázek ohledně tvorby majetku a dlouhodobé vize. Věděla jsem toho sice už spoustu, ale až po poslechu Vašich podcastů mi to teprve vše docvaklo.",
    name: "— Žena",
    role: "Posluchačka podcastu Principy růstu",
  },
  {
    quote:
      "Přidávám tip na super-nadupaný podcast; konkrétně díl o principech bohatství a zdravých návycích. Došlo mi při poslechu opravdu spousta souvislostí. Díky @magiezivota 🙏",
    name: "— Sdílení na sociálních sítích",
    role: "Posluchač podcastu Principy růstu",
  },
  {
    quote:
      "Ahoj kluci, začal jsem nedávno poslouchat váš podcast a je to super! Moc se mi líbí vaše myšlenky a hodně věcí mám v plánu si díky vám zavést do života (poslouchal jsem díl o osobním růstu a ranních rituálech). Odvádíte moc dobrou práci, mě baví vás poslouchat!",
    name: "— Muž",
    role: "Posluchač podcastu Principy růstu",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="snap-section min-h-[100dvh] bg-[#f6f6f6] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0 w-full">
        {/* Header */}
        <div className="mb-16">
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

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <Reveal key={index} delay={index * 0.12}>
              <div className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-10 h-full flex flex-col border border-[#e8e5e2] hover:border-[#c5a889] transition-colors duration-300">
                {/* Quote mark */}
                <span className="font-heading font-700 text-5xl text-[#c5a889] leading-none mb-4 block">
                  "
                </span>
                <p className="text-[#1a1a1a] text-lg leading-relaxed flex-1 mb-8">
                  {item.quote}
                </p>
                <div className="border-t border-[#e8e5e2] pt-6">
                  <p className="font-heading font-600 text-dark text-sm">
                    {item.name}
                  </p>
                  <p className="text-[#6b6b6b] text-xs mt-1">{item.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
