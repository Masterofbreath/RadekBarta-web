import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function AboutSection() {
  return (
    <section className="snap-section min-h-[100dvh] bg-[#f6f6f6] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <Reveal direction="left" className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-3xl overflow-hidden">
              <Image
                src="/images/about.jpg"
                alt="Radek Bárta — deep work"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              {/* Subtle overlay for mood */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#97724f]/20 to-transparent" />
            </div>
          </Reveal>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <Reveal delay={0.1}>
              <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
                Kdo jsem
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark mb-6">
                Investor.
                <br />
                Podcaster.
                <br />
                <span className="text-[#97724f]">Podnikatel.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="space-y-4 mb-10">
                {[
                  {
                    label: "Investiční zprostředkování",
                    text: "Jako vázaný zástupce Golden Gate CZ pomáhám klientům budovat diverzifikovaná portfolia — od fyzických drahých kovů přes investiční fondy až po nemovitosti. Spolupracuji s nejlepšími finančníky na trhu.",
                  },
                  {
                    label: "Tvorba edukativního obsahu",
                    text: "Sdílím myšlenky a principy růstu — inspirace o investicích, seberozvoji, podnikání a technologiích.",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <p className="text-[#6b6b6b] text-base leading-relaxed">
                      <span className="font-semibold text-dark">{item.label}:</span>{" "}
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.5}>
              <div className="grid grid-cols-3 gap-6 border-t border-[#e8e5e2] pt-8">
                {[
                  { value: "9+", label: "let v investicích" },
                  { value: "160+", label: "epizod podcastu" },
                  { value: "500+", label: "klientů" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading font-700 text-3xl text-[#97724f] mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-[#6b6b6b]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
