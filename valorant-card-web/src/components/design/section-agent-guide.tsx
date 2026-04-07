import { SectionTitle, SubSectionTitle, CodeBlock, SimpleTable } from "./shared";

/* ─── Quick Rule ─── */

interface QuickRuleProps {
  number: number;
  text: string;
}

const QuickRule = ({ number, text }: QuickRuleProps) => (
  <div className="flex items-start gap-3">
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-xs font-bold text-primary">
      {number}
    </span>
    <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
  </div>
);

/* ─── Section ─── */

const AgentGuideSection = () => (
  <section className="space-y-8">
    <SectionTitle id="agent-guide">9. Agent Prompt Guide</SectionTitle>

    {/* Quick Rules */}
    <div className="space-y-4">
      <SubSectionTitle>Quick Rules</SubSectionTitle>
      <div className="space-y-3 rounded-lg border border-border bg-card p-5">
        <QuickRule number={1} text="Dark mode only — use bg-background, text-foreground, never assume light surfaces" />
        <QuickRule number={2} text="Red is accent only — text-primary / bg-primary for borders, highlights, CTAs. Never as background fill (except Roast)" />
        <QuickRule number={3} text="Uppercase structural text — section headings, stat labels, badge names are ALL-CAPS with tracking-widest" />
        <QuickRule number={4} text="Large stat numbers — stat values should be visually dominant (text-3xl+, font-black)" />
        <QuickRule number={5} text="Left bar accent — section headers use a red vertical bar (h-8 w-1 bg-primary) as visual anchor" />
        <QuickRule number={6} text="Boast/Roast pattern — all text boxes use border-l-2 border-[#FF4655] left accent. Boast (dark bg + white text) / Roast (red bg + dark text)" />
        <QuickRule number={7} text="Semi-transparent borders — borders use border-border (10% white), not solid gray" />
      </div>
    </div>

    {/* Patterns */}
    <div className="space-y-4">
      <SubSectionTitle>UI Patterns</SubSectionTitle>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Detail Panel */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Detail Panel</p>
          <CodeBlock>
{`<div className="rounded-lg bg-card p-6 sm:p-8">
  <div className="mb-8 flex items-center gap-3">
    <div className="h-8 w-1 bg-primary" />
    <h2 className="text-lg font-bold uppercase
      tracking-widest text-foreground">
      Section Title
    </h2>
  </div>
  {/* Content */}
</div>`}
          </CodeBlock>
          {/* Live preview */}
          <div className="rounded-lg bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-primary" />
              <h2 className="text-lg font-bold uppercase tracking-widest text-foreground">
                Section Title
              </h2>
            </div>
          </div>
        </div>

        {/* Stat Display */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Stat Display</p>
          <CodeBlock>
{`<div className="flex flex-col">
  <span className="mb-1 text-xs uppercase
    tracking-tight text-muted-foreground">
    STAT LABEL
  </span>
  <span className="text-3xl font-black
    tracking-tight text-foreground">
    {value}
  </span>
</div>`}
          </CodeBlock>
          <div className="rounded-lg bg-card p-6">
            <div className="flex flex-col">
              <span className="mb-1 text-xs uppercase tracking-tight text-muted-foreground">
                COMBAT SCORE
              </span>
              <span className="text-3xl font-black tracking-tight text-foreground">
                312
              </span>
            </div>
          </div>
        </div>

        {/* Tactical Corner */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Tactical Corner Decoration</p>
          <CodeBlock>
{`<div className="absolute right-0 top-0
  h-16 w-16 border-r-2 border-t-2
  border-primary/20" />`}
          </CodeBlock>
          <div className="relative h-24 rounded-lg bg-card">
            <div className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-primary/20" />
            <p className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
              Top-right L-line
            </p>
          </div>
        </div>

        {/* Terminal Line */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Terminal Line</p>
          <CodeBlock>
{`<p className="font-mono text-sm
  leading-relaxed text-white/70">
  &gt; COMMAND OUTPUT TEXT
</p>`}
          </CodeBlock>
          <div className="rounded-lg border-l-2 border-[#FF4655] bg-background p-4">
            <p className="font-mono text-sm leading-relaxed text-white/70">
              &gt; INITIATING BEHAVIORAL DIAGNOSTICS...
            </p>
            <p className="font-mono text-sm leading-relaxed text-white/70">
              &gt; STATUS: <span className="rounded bg-white/10 px-1 text-white">OPTIMIZED FOR CLIMBING</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Tech Stack */}
    <div className="space-y-4">
      <SubSectionTitle>Tech Stack</SubSectionTitle>
      <SimpleTable
        headers={["Technology", "Version", "Notes"]}
        rows={[
          ["Next.js", "16.2+", "App Router, export default function for routes"],
          ["React", "19.2+", "React Compiler — no manual memoization"],
          ["Tailwind CSS", "4.1+", "PostCSS plugin, @theme inline for tokens"],
          ["shadcn/ui", "Latest", "Base component library (src/components/ui/)"],
          ["Class utility", "cn()", "tailwind-merge(clsx(...)) from src/lib/cn.ts"],
          ["Package manager", "pnpm", "Required — no npm or yarn"],
        ]}
      />
    </div>

    {/* File Organization */}
    <div className="space-y-4">
      <SubSectionTitle>File Organization</SubSectionTitle>
      <CodeBlock>
{`src/
  app/              Route components (export default function)
  components/
    card/           Card system (TierCard, detail panels)
    home/           Landing page components
    ui/             shadcn base components
    test/           Test page components
  constants/        Design tokens, tier mappings
  lib/              Utilities, Valorant data helpers
  styles/           globals.css (theme, animations, custom classes)
  asset/            Static assets (tier card backgrounds)`}
      </CodeBlock>
    </div>
  </section>
);

export { AgentGuideSection };
