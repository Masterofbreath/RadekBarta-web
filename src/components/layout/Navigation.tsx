"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, CloseIcon } from "@/components/ui/Icons";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#f6f6f6]/90 backdrop-blur-xl border-b border-[#e8e5e2]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo placeholder — prázdné místo pro budoucí logo */}
          <Link href="/" className="w-8 h-8 block" aria-label="Radek Bárta — domů" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              "external" in link && link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#6b6b6b] hover:text-[#97724f] transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#97724f]"
                      : "text-[#6b6b6b] hover:text-dark"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="/investice#kontakt"
              className="hidden lg:inline-flex items-center px-5 py-2.5 bg-[#97724f] text-white text-sm font-semibold font-heading rounded-full hover:bg-[#7a5c3e] transition-all duration-300 hover:scale-[1.02]"
            >
              Sjednat konzultaci
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e8e5e2] transition-colors"
              aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
            >
              {isOpen ? (
                <CloseIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#f6f6f6] flex flex-col pt-24 pb-32 px-8"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, index) =>
                "external" in link && link.external ? (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="text-3xl font-heading font-600 text-[#6b6b6b] hover:text-[#97724f] py-3 border-b border-[#e8e5e2] transition-colors"
                  >
                    {link.label} ↗
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      scroll={false}
                      className="block text-3xl font-heading font-600 text-dark hover:text-[#97724f] py-3 border-b border-[#e8e5e2] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto"
            >
              <a
                href="/investice#kontakt"
                className="w-full flex items-center justify-center px-6 py-4 bg-[#97724f] text-white text-lg font-semibold font-heading rounded-2xl hover:bg-[#7a5c3e] transition-colors"
              >
                Sjednat konzultaci
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
