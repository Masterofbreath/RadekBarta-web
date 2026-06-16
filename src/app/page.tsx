import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import StrengthsSection from "@/components/sections/StrengthsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EcosystemSection />
      <StrengthsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <ContactSection />
    </>
  );
}
