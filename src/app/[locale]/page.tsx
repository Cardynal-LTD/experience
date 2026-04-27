import ComingSoon from "@/components/sections/coming-soon";
import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import FeaturesDeepDive from "@/components/sections/features-deep-dive";
import Footer from "@/components/sections/footer";
import Founders from "@/components/sections/founders";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Pricing from "@/components/sections/pricing";
import Problem from "@/components/sections/problem";
import Security from "@/components/sections/security";
import Solution from "@/components/sections/solution";
import TreeWidget from "@/components/sections/tree-widget";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <TreeWidget />
      <HowItWorks />
      <FeaturesDeepDive />
      <Security />
      <Pricing />
      <Founders />
      <FAQ />
      <ComingSoon />
      <CTA />
      <Footer />
    </main>
  );
}
