import type { ReactNode } from "react";

interface HeroLayoutProps {
  children: ReactNode;
}

const HeroLayout = ({ children }: HeroLayoutProps) => {
  return (
    <section className="relative flex min-h-screen flex-col md:flex-row">
      {children}
    </section>
  );
};

export { HeroLayout };
