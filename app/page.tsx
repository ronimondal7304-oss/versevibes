import { Navbar } from "@/components/shared/Navbar"
import { Hero } from "@/components/landing/Hero"
import { AboutSection } from "@/components/landing/AboutSection"
import { FeaturedContent } from "@/components/landing/FeaturedContent"
import { WhyJoin } from "@/components/landing/WhyJoin"
import { Testimonials } from "@/components/landing/Testimonials"
import { CTASection } from "@/components/landing/CTASection"
import { Footer } from "@/components/shared/Footer"

export default function LandingPage() {
  return (
    <main className="relative z-10">
      <Navbar />
      <Hero />
      <AboutSection />
      <FeaturedContent />
      <WhyJoin />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
