import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Pricing from "@/components/sections/pricing";
import Problem from "@/components/sections/problem";
import Solution from "@/components/sections/solution";
import TrustStrip from "@/components/sections/trust-strip";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustStrip />
      <Problem />
      <Solution />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
