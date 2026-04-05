import { Suspense } from "react";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <Suspense>
      <HeroSection />
    </Suspense>
  );
}
