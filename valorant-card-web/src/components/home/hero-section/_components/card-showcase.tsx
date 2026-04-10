import { CardColumn } from "@/components/home/card-column";
import { COLUMN_1, COLUMN_2, COLUMN_3 } from "@/constants/card/showcase-cards";

const CardShowcase = () => {
  return (
    <aside className="relative z-10 flex h-screen items-center overflow-hidden md:w-[45%]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-background via-background/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="flex h-full w-full gap-3 px-4">
        <CardColumn cards={COLUMN_1} direction="up" speed={60} delay={0.1} />
        <CardColumn
          cards={COLUMN_2}
          direction="down"
          speed={44}
          delay={0.3}
        />
        <CardColumn cards={COLUMN_3} direction="up" speed={52} delay={0.5} />
      </div>
    </aside>
  );
};

export { CardShowcase };
