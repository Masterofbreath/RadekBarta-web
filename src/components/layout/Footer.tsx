import Link from "next/link";
import { YoutubeIcon, InstagramIcon, LinkedinIcon, FacebookIcon } from "@/components/ui/Icons";
import { SITE, SOCIAL, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-12 lg:mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-heading font-700 text-xl text-white mb-3">
              {SITE.name}
            </p>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Architekt bohatství, tvůrce obsahu a průvodce na cestě za finanční i osobní svobodou.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#97724f] transition-colors"
                aria-label="YouTube Radek Bárta"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#97724f] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#97724f] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#97724f] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold font-heading uppercase tracking-widest text-white/40 mb-5">
              Navigace
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) =>
                "external" in link && link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label} ↗
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold font-heading uppercase tracking-widest text-white/40 mb-5">
              Kontakt
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {currentYear} {SITE.name}. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/ochrana-osobnich-udaju" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Ochrana osobních údajů
            </Link>
            <Link href="/obchodni-podminky" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Obchodní podmínky
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
