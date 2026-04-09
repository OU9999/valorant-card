import { SectionTitle, SubSectionTitle, SimpleTable } from "./shared";

/* ─── Font Sample ─── */

interface FontSampleProps {
  fontClass: string;
  name: string;
  variable: string;
  sample: string;
  weights?: string;
}

const FontSample = ({ fontClass, name, variable, sample, weights }: FontSampleProps) => (
  <div className="rounded-lg border border-border bg-card p-5">
    <div className="mb-3 flex items-baseline justify-between">
      <p className="text-xs font-bold uppercase tracking-widest text-foreground">{name}</p>
      <p className="font-mono text-[10px] text-muted-foreground">{variable}</p>
    </div>
    <p className={`text-2xl ${fontClass}`}>{sample}</p>
    {weights && (
      <p className="mt-2 text-[10px] text-muted-foreground">Weights: {weights}</p>
    )}
  </div>
);

/* ─── Typography Specimen ─── */

interface SpecimenProps {
  label: string;
  classes: string;
  sample: string;
}

const Specimen = ({ label, classes, sample }: SpecimenProps) => (
  <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
      {label}
    </p>
    <p className={classes}>{sample}</p>
    <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">{classes}</p>
  </div>
);

/* ─── Section ─── */

const TypographySection = () => (
  <section className="space-y-8">
    <SectionTitle id="typography">2. Typography Rules</SectionTitle>

    {/* Font Stack */}
    <div className="space-y-4">
      <SubSectionTitle>Font Stack</SubSectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FontSample
          fontClass="font-heading"
          name="Barlow Condensed (Heading)"
          variable="--font-heading"
          sample="VALORANT FC CARD"
          weights="400, 500, 600, 700, 800"
        />
        <FontSample
          fontClass="font-barlow-condensed"
          name="Barlow Condensed"
          variable="--font-barlow-condensed"
          sample="COMBAT SCORE 312"
          weights="400, 500, 600, 700, 800"
        />
        <FontSample
          fontClass="font-sans"
          name="Noto Sans KR"
          variable="--font-noto-sans-kr"
          sample="나만의 발로란트 카드를 만들어보세요"
        />
        <FontSample
          fontClass="font-black-han-sans"
          name="Black Han Sans"
          variable="--font-black-han-sans"
          sample="발로란트 FC 카드"
          weights="400"
        />
      </div>
    </div>

    {/* Card Typography Scale */}
    <div className="space-y-4">
      <SubSectionTitle>Card Typography Scale (Container Query)</SubSectionTitle>
      <SimpleTable
        headers={["Element", "Default", "SM", "Weight"]}
        rows={[
          ["OVR Number", "clamp(1rem, 21.2cqw, 5rem)", "clamp(0.75rem, 18cqw, 4rem)", "font-extrabold"],
          ["Tier Icon", "clamp(0.5rem, 12.7cqw, 3rem)", "clamp(0.375rem, 10cqw, 2.25rem)", "—"],
          ["Region", "clamp(0.4375rem, 7.5cqw, 1.75rem)", "Same", "font-bold"],
          ["Player Name", "clamp(0.5rem, 9.5cqw, 2.25rem)", "clamp(0.375rem, 7cqw, 1.75rem)", "font-bold"],
          ["Stat Label", "clamp(0.25rem, 3.7cqw, 0.875rem)", "clamp(0.125rem, 2.8cqw, 0.625rem)", "font-medium"],
          ["Stat Value", "clamp(0.375rem, 7.4cqw, 1.75rem)", "clamp(0.25rem, 5.5cqw, 1.25rem)", "font-bold"],
        ]}
      />
    </div>

    {/* Page Typography Specimens */}
    <div className="space-y-4">
      <SubSectionTitle>Page Typography</SubSectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Specimen
          label="Hero Title (Brand)"
          classes="text-5xl font-extrabold uppercase tracking-wide text-primary font-heading"
          sample="VALORANT"
        />
        <Specimen
          label="Hero Subtitle"
          classes="text-3xl font-bold uppercase tracking-wide text-foreground"
          sample="FC CARD"
        />
        <Specimen
          label="Section Heading"
          classes="text-lg font-bold uppercase tracking-widest text-foreground"
          sample="COMBAT STATS"
        />
        <Specimen
          label="Section Subheading"
          classes="text-sm font-bold uppercase tracking-widest text-foreground"
          sample="PERFORMANCE BADGES"
        />
        <Specimen
          label="Body Text"
          classes="text-sm text-muted-foreground"
          sample="나만의 발로란트 카드를 생성하고 공유하세요."
        />
        <Specimen
          label="Badge Label"
          classes="text-[10px] font-bold uppercase tracking-widest text-foreground"
          sample="ACE HUNTER"
        />
        <Specimen
          label="Stat Value (Detail)"
          classes="text-3xl font-black tracking-tight text-foreground"
          sample="312"
        />
        <Specimen
          label="Stat Label (Detail)"
          classes="text-xs uppercase tracking-tight text-muted-foreground"
          sample="Combat Score"
        />
      </div>
    </div>

    {/* Conventions */}
    <div className="space-y-4">
      <SubSectionTitle>Typography Conventions</SubSectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            ALL-CAPS + tracking-widest
          </p>
          <p className="text-sm font-bold uppercase tracking-widest text-foreground">
            SECTION HEADING EXAMPLE
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">
            Structural text: headings, labels, badges
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            tracking-tight
          </p>
          <p className="text-4xl font-black tracking-tight text-foreground">
            312
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">
            Large stat numbers: keeps digits compact
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Player Name Style
          </p>
          <p className="text-lg font-bold uppercase tracking-widest text-foreground">
            Demon1
          </p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">
            tracking-widest — signature spacing
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Card Internals
          </p>
          <p className="text-sm text-muted-foreground">
            Always <span className="font-mono text-foreground">cqw</span> units via{" "}
            <span className="font-mono text-foreground">clamp()</span>, never fixed px or viewport units
          </p>
        </div>
      </div>
    </div>
  </section>
);

export { TypographySection };
