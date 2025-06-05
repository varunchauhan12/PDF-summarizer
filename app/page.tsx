import { Button } from "@/components/ui/button";
import BgGradient from "@/components/ui/common/bg-gradient";
import HeroSection from "@/components/ui/home/hero-section";
import DemoSection from "@/components/ui/home/demo-section";
import HowItWorksSection from "@/components/ui/home/howitworks-section";
import PricingSection from "@/components/ui/home/pricing-section";
import CtaSection from "@/components/ui/home/cta-section";
export default function Home() {
  return (
    <div className="relative w-full ">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
        <CtaSection />
      </div>
    </div>
  );
}
