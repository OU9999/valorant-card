"use client";

import { HeroCta } from "@/components/home/hero-section/_components/hero-cta";
import { DataDisclosureDialog } from "@/components/home/data-disclosure-dialog";
import { useHeroAction } from "@/components/home/hero-section/_hooks/use-hero-action";

const HeroInteractive = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    dialogOpen,
    setDialogOpen,
    generateCard,
    handleLogout,
    navigateToPreview,
  } = useHeroAction();

  return (
    <>
      <HeroCta
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
        error={error}
        onGenerate={generateCard}
        onLogout={handleLogout}
        onLoginClick={() => setDialogOpen(true)}
      />
      <DataDisclosureDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onPreview={navigateToPreview}
      />
    </>
  );
};

export { HeroInteractive };
