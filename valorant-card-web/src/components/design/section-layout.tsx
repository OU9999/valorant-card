import { SectionTitle, SubSectionTitle, SimpleTable } from "./shared";

/* ─── Spacing Sample ─── */

interface SpacingSampleProps {
  label: string;
  size: string;
}

const SpacingSample = ({ label, size }: SpacingSampleProps) => (
  <div className="flex items-center gap-3">
    <div className={`${size} rounded bg-primary/40`} />
    <span className="font-mono text-[10px] text-muted-foreground">{label}</span>
  </div>
);

/* ─── Radius Sample ─── */

interface RadiusSampleProps {
  label: string;
  cssVar: string;
  value: string;
}

const RadiusSample = ({ label, cssVar, value }: RadiusSampleProps) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="h-16 w-16 border-2 border-primary/40 bg-card"
      style={{ borderRadius: `var(${cssVar})` }}
    />
    <div className="text-center">
      <p className="text-[10px] font-bold text-foreground">{label}</p>
      <p className="font-mono text-[10px] text-muted-foreground">{value}</p>
    </div>
  </div>
);

/* ─── Section ─── */

const LayoutSection = () => (
  <section className="space-y-8">
    <SectionTitle id="layout">5. Layout Principles</SectionTitle>

    {/* Page Layouts */}
    <div className="space-y-4">
      <SubSectionTitle>Page Layouts</SubSectionTitle>
      <div className="space-y-6">
        {/* Hero Layout */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Hero — 55/45 Split</p>
          <div className="flex h-32 gap-1 overflow-hidden rounded-lg border border-border">
            <div className="flex w-[55%] items-center justify-center bg-card">
              <div className="text-center">
                <p className="font-heading text-lg text-primary">VALORANT</p>
                <p className="text-xs text-foreground">Title + CTA</p>
              </div>
            </div>
            <div className="flex w-[45%] items-center justify-center bg-secondary">
              <p className="text-[10px] text-muted-foreground">3-Column Card Carousel</p>
            </div>
          </div>
          <p className="font-mono text-[10px] text-muted-foreground">
            min-h-screen. Mobile: stacked vertical
          </p>
        </div>

        {/* Card Detail Layout */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Card Detail — Responsive Split</p>
          <div className="flex h-32 gap-1 overflow-hidden rounded-lg border border-border">
            <div className="flex w-[40%] items-center justify-center bg-card">
              <p className="text-[10px] text-muted-foreground">TierCard</p>
            </div>
            <div className="flex w-[60%] flex-col items-center justify-center gap-1 bg-secondary p-2">
              <div className="w-full rounded bg-card/50 p-1.5 text-center text-[9px] text-muted-foreground">CombatStats</div>
              <div className="w-full rounded bg-card/50 p-1.5 text-center text-[9px] text-muted-foreground">PerformanceBadges</div>
              <div className="w-full rounded bg-card/50 p-1.5 text-center text-[9px] text-muted-foreground">AIFeedback</div>
            </div>
          </div>
          <p className="font-mono text-[10px] text-muted-foreground">
            max-w-7xl mx-auto
          </p>
        </div>
      </div>
    </div>

    {/* Card Showcase Carousel */}
    <div className="space-y-4">
      <SubSectionTitle>Card Showcase Carousel</SubSectionTitle>
      <SimpleTable
        headers={["Column", "Direction", "Speed", "Entry Delay"]}
        rows={[
          ["1", "Up", "60s", "0.1s"],
          ["2", "Down", "44s", "0.3s"],
          ["3", "Up", "52s", "0.5s"],
        ]}
      />
      <p className="text-xs text-muted-foreground">
        Fade masks: h-32 gradient at top/bottom. Column entry: opacity 0→1, translateY(40px→0), 0.8s cubic-bezier(0.16, 1, 0.3, 1).
      </p>
    </div>

    {/* Spacing System */}
    <div className="space-y-4">
      <SubSectionTitle>Spacing System</SubSectionTitle>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <SpacingSample label="gap-3 (12px) — badge wraps" size="h-3 w-3" />
        <SpacingSample label="p-6 (24px) — mobile panel" size="h-6 w-6" />
        <SpacingSample label="gap-x-6 gap-y-8 — stat grid" size="h-6 w-8" />
        <SpacingSample label="sm:p-8 (32px) — desktop panel" size="h-8 w-8" />
        <SpacingSample label="mb-8 (32px) — section gap" size="h-8 w-8" />
      </div>
    </div>

    {/* Border Radius Scale */}
    <div className="space-y-4">
      <SubSectionTitle>Border Radius Scale</SubSectionTitle>
      <p className="text-xs text-muted-foreground">Base radius: 0.625rem (10px)</p>
      <div className="flex flex-wrap gap-6">
        <RadiusSample label="sm" cssVar="--radius-sm" value="6px" />
        <RadiusSample label="md" cssVar="--radius-md" value="8px" />
        <RadiusSample label="lg" cssVar="--radius-lg" value="10px" />
        <RadiusSample label="xl" cssVar="--radius-xl" value="14px" />
        <RadiusSample label="2xl" cssVar="--radius-2xl" value="18px" />
      </div>
    </div>
  </section>
);

export { LayoutSection };
