import { getTranslations } from "next-intl/server";

interface HeroStatsProps {
  generated?: number;
  shared?: number;
}

const HeroStats = async ({ generated = 0, shared = 0 }: HeroStatsProps) => {
  const t = await getTranslations("Home");

  return (
    <dl className="mt-16 flex gap-12">
      <div>
        <dd className="text-4xl font-black text-foreground">{generated}</dd>
        <dt className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-primary" />
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            {t("cardsGenerated")}
          </span>
        </dt>
      </div>
      <div>
        <dd className="text-4xl font-black text-foreground">{shared}</dd>
        <dt className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-emerald-500" />
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            {t("cardsShared")}
          </span>
        </dt>
      </div>
    </dl>
  );
};

export { HeroStats };
export type { HeroStatsProps };
