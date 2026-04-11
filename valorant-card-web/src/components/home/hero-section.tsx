import { Suspense } from "react";
import { HeroLayout } from "@/components/home/hero-section/_components/hero-layout";
import { HeroContent } from "@/components/home/hero-section/_components/hero-content";
import { HeroInteractive } from "@/components/home/hero-section/_components/hero-interactive";
import { HeroStats } from "@/components/home/hero-section/_components/hero-stats";
import { CardShowcase } from "@/components/home/hero-section/_components/card-showcase";

const HeroSection = () => {
  return (
    <HeroLayout>
      <HeroContent>
        <Suspense>
          <HeroInteractive />
        </Suspense>
        <HeroStats />
      </HeroContent>
      <CardShowcase />
    </HeroLayout>
  );
};

export { HeroSection };
