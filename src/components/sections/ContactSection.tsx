import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import { SITE, SOCIAL } from "@/lib/constants";
import { YoutubeIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function ContactSection() {
  return (
    <section id="kontakt" className="snap-section min-h-[100dvh] bg-[#f6f6f6] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <Reveal>
              <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
                Kontakt
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-dark mb-6">
                Pojďme se
                <br />
                <span className="text-[#97724f]">propojit</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#6b6b6b] text-lg leading-relaxed mb-10 max-w-md">
                Chcete vědět, jak můžeme spolupracovat, nebo jen hledáte správný
                směr? Napište mi — rád si najdu čas.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-4 mb-10">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#97724f] transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-[#e8e5e2] group-hover:bg-[#97724f]/10 flex items-center justify-center transition-colors text-sm">
                    ✉
                  </span>
                  <span className="text-sm font-medium">{SITE.email}</span>
                </a>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#97724f] transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-[#e8e5e2] group-hover:bg-[#97724f]/10 flex items-center justify-center transition-colors text-sm">
                    📱
                  </span>
                  <span className="text-sm font-medium">{SITE.phone}</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div>
                <p className="text-xs font-semibold font-heading uppercase tracking-widest text-[#aaa] mb-4">
                  Sledujte mě
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { href: SOCIAL.youtube, Icon: YoutubeIcon, label: "YouTube" },
                    { href: SOCIAL.instagram, Icon: InstagramIcon, label: "Instagram" },
                    { href: SOCIAL.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 rounded-full bg-[#e8e5e2] hover:bg-[#97724f] hover:text-white text-[#6b6b6b] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.2} direction="right">
            <div className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-10 border border-[#e8e5e2]">
              <ContactForm
                type="contact"
                title="Napište mi"
                subtitle="Odpovím co nejdříve, zpravidla do 48 hodin."
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
