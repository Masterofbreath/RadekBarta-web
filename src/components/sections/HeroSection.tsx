"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="snap-section relative min-h-[100dvh] bg-[#111111] flex items-center overflow-hidden">
      {/* Background image — anchored right so Radek's face stays on the right */}
      <div className="absolute inset-0">
        {/* Mobile: face from right edge ~78% | Desktop: 65% */}
        <Image
          src="/images/hero.jpg"
          alt="Radek Bárta"
          fill
          priority
          unoptimized
          className="object-cover [object-position:78%_center] lg:[object-position:65%_center]"
          sizes="100vw"
        />

        {/* Mobile: semi-dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#111111]/50 lg:hidden" />

        {/* Desktop: gradient — solid left 20%, smooth fade by 52% */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #111111 20%, rgba(17,17,17,0.82) 35%, rgba(17,17,17,0.2) 50%, transparent 62%)",
          }}
        />

        {/* Mobile: top gradient so text (top half) reads cleanly */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.6) 40%, rgba(17,17,17,0.3) 100%)",
          }}
        />

        {/* Bottom fade — all devices */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #111111 0%, rgba(17,17,17,0.35) 15%, transparent 30%)",
          }}
        />
      </div>

      {/* Content — left-aligned, mobile-first spacing */}
      <div className="relative z-10 w-full px-6 lg:px-16 pt-20 pb-20 lg:pb-32 lg:pt-28">
        <div className="max-w-[280px] sm:max-w-sm lg:max-w-2xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#c5a889] text-[10px] lg:text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4 lg:mb-6"
          >
            Investiční stratég · Tvůrce inspirativního obsahu
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-heading font-800 text-white text-3xl sm:text-4xl lg:text-6xl xl:text-7xl leading-[1.08] tracking-tight mb-4 lg:mb-6"
          >
            Strategie,
            <br />
            stabilita
            <br />
            <span className="text-[#c5a889]">a vědomý růst.</span>
          </motion.h1>

          {/* Subtitle — zkrácená verze na mobilu */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-white/55 text-sm lg:text-xl leading-relaxed mb-7 lg:mb-10 max-w-[240px] sm:max-w-xs lg:max-w-lg"
          >
            <span className="lg:hidden">
              Průvodce na cestě za finanční i osobní svobodou.
            </span>
            <span className="hidden lg:inline">
              Jmenuji se Radek Bárta. Jsem průvodce na cestě za finanční i
              osobní svobodou — od investičního zprostředkování po tvorbu komunit,
              které inspirují.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4"
          >
            <a
              href="#ekosystem"
              className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 bg-[#97724f] text-white font-heading font-semibold rounded-full hover:bg-[#7a5c3e] transition-all duration-300 hover:scale-[1.02] text-xs lg:text-sm"
            >
              Objevte moje projekty
            </a>
            <Link
              href="/investice"
              className="inline-flex items-center gap-2 text-white/65 hover:text-white font-medium text-xs lg:text-sm transition-colors group"
            >
              Sjednat konzultaci
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </motion.div>

          {/* Tags — pouze desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden lg:flex flex-wrap gap-3 mt-10"
          >
            {[
              "Architektura bohatství",
              "YouTube Channel",
              "Principy růstu",
              "Kruh tvůrců",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1 font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
