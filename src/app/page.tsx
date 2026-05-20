import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import StrengthsSection from "@/components/sections/StrengthsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="snap-container">
      <HeroSection />
      <AboutSection />
      <EcosystemSection />
      <StrengthsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <ContactSection />
    </div>
  );
}
