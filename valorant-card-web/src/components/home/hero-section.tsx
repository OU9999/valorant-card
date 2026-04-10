"use client";

import { HeroLayout } from "@/components/home/hero-section/_components/hero-layout";
import { HeroContent } from "@/components/home/hero-section/_components/hero-content";
import { HeroCta } from "@/components/home/hero-section/_components/hero-cta";
import { HeroStats } from "@/components/home/hero-section/_components/hero-stats";
import { CardShowcase } from "@/components/home/hero-section/_components/card-showcase";
import { DataDisclosureDialog } from "@/components/home/data-disclosure-dialog";
import { useHeroAction } from "@/components/home/hero-section/_hooks/use-hero-action";

interface HeroSectionProps {
  rsoSuccess: boolean;
  rsoError: boolean;
}

const HeroSection = ({ rsoSuccess, rsoError }: HeroSectionProps) => {
  const {
    isLoading,
    isAuthenticated,
    error,
    dialogOpen,
    setDialogOpen,
    generateCard,
    handleLogout,
    navigateToPreview,
  } = useHeroAction({ rsoSuccess, rsoError });

  return (
    <HeroLayout>
      <HeroContent>
        <HeroCta
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
          error={error}
          onGenerate={generateCard}
          onLogout={handleLogout}
          onLoginClick={() => setDialogOpen(true)}
        />
        <HeroStats />
        <DataDisclosureDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onPreview={navigateToPreview}
        />
      </HeroContent>
      <CardShowcase />
    </HeroLayout>
  );
};

export { HeroSection };
