"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function InvesticeHero() {
  return (
    <section className="relative min-h-[100dvh] bg-[#111111] flex items-center overflow-hidden">
      {/* Background image — same positioning as homepage */}
      <div className="absolute inset-0">
        <Image
          src="/images/investice-bg.png"
          alt="Radek Bárta — investice a architektura bohatství"
          fill
          priority
          unoptimized
          className="object-cover [object-position:75%_center]"
          sizes="100vw"
        />

        {/* Mobile: semi-dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#111111]/60 lg:hidden" />

        {/* Desktop: gradient — solid left 20%, smooth fade by 55% */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #111111 18%, rgba(17,17,17,0.85) 32%, rgba(17,17,17,0.3) 52%, transparent 68%)",
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

      {/* Content — left-aligned, same as homepage */}
      <div className="relative z-10 w-full px-6 lg:px-16 pt-20 pb-20 lg:pb-32 lg:pt-28">
        <div className="max-w-[280px] sm:max-w-sm lg:max-w-2xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#c5a889] text-[10px] lg:text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4 lg:mb-6"
          >
            Investice · Tvorba bohatství
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-heading font-800 text-white text-3xl sm:text-4xl lg:text-6xl xl:text-7xl leading-[1.08] tracking-tight mb-4 lg:mb-6"
          >
            Budování
            <br />
            a ochrana
            <br />
            <span className="text-[#c5a889]">Vašeho majetku</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-white/55 text-sm lg:text-xl leading-relaxed mb-7 lg:mb-10 max-w-[240px] sm:max-w-xs lg:max-w-lg"
          >
            <span className="lg:hidden">
              Klid a kontrola nad svým majetkem — v každé situaci.
            </span>
            <span className="hidden lg:inline">
              Pomáhám rodinám i podnikatelům najít klid v nejisté době —
              nabízím jedinečnou kombinaci investic, které jsou prověřeny časem.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <a
              href="#kontakt"
              className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 bg-[#97724f] text-white font-heading font-semibold rounded-full hover:bg-[#7a5c3e] transition-all duration-300 hover:scale-[1.02] text-xs lg:text-sm"
            >
              Sjednat bezplatnou konzultaci
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
