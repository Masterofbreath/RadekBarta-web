"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="snap-section relative min-h-[100dvh] bg-[#111111] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Radek Bárta"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-24 lg:pb-32 lg:pt-28">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#c5a889] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-6"
          >
            Architekt bohatství · Tvůrce obsahu
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-heading font-800 text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6"
          >
            Strategie,
            <br />
            stabilita
            <br />
            <span className="text-[#c5a889]">a vědomý růst.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-white/60 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg"
          >
            Jmenuji se Radek Bárta. Jsem průvodce na cestě za finanční i
            osobní svobodou — od architektu&shy;ry bohatství po tvorbu obsahu,
            který inspiruje tisíce lidí.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#ekosystem"
              className="inline-flex items-center px-8 py-4 bg-[#97724f] text-white font-heading font-semibold rounded-full hover:bg-[#7a5c3e] transition-all duration-300 hover:scale-[1.02] text-sm"
            >
              Objevte moje projekty
            </a>
            <Link
              href="/investice"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium text-sm transition-colors group"
            >
              Sjednat konzultaci
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-3 mt-10"
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
