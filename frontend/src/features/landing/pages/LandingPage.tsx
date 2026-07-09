import CtaSection from "../components/CtaSection"
import FeaturesSection from "../components/FeaturesSection"
import FooterSection from "../components/FooterSection"
import HeroSection from "../components/HeroSection"
import HowItWorksSection from "../components/HowItWorksSection"
import Navigation from "../components/Navigation"

const LandingPage = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>

      <main className="relative min-h-screen overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>

      <FooterSection />
    </>
  )
}

export default LandingPage
