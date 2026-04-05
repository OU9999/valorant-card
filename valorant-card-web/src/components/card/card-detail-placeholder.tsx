interface PlaceholderSectionProps {
  title: string;
  description: string;
}

const PlaceholderSection = ({ title, description }: PlaceholderSectionProps) => {
  return (
    <div className="rounded-lg border border-dashed border-muted-foreground/25 bg-muted/10 p-6">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground/60">{description}</p>
    </div>
  );
};

const CardDetailPlaceholder = () => {
  return (
    <>
      <PlaceholderSection
        title="Stats"
        description="ACS, K/D, HS%, DDΔ, KAST, ADR 상세 스탯이 여기에 표시됩니다."
      />
      <PlaceholderSection
        title="Badges"
        description="획득한 뱃지와 업적이 여기에 표시됩니다."
      />
      <PlaceholderSection
        title="AI Feedback"
        description="플레이 분석 피드백이 여기에 표시됩니다."
      />
    </>
  );
};

export { CardDetailPlaceholder };
