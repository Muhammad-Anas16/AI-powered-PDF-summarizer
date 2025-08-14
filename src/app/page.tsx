import CTA_Section from "@/components/Home/CTA_Section";
import DemoSection from "@/components/Home/DemoSection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorkSection from "@/components/Home/HowItWorkSection";
import PricingSection from "@/components/Home/PricingSection";


export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <HeroSection />
      <DemoSection />
      <HowItWorkSection />
      <PricingSection />
      <CTA_Section />
    </div>
  );
}
