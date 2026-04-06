import { SectionTitle } from "./shared";

/* ─── Rule Item ─── */

interface RuleItemProps {
  type: "do" | "dont";
  text: string;
}

const RuleItem = ({ type, text }: RuleItemProps) => {
  const isDo = type === "do";
  return (
    <div className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          isDo
            ? "bg-emerald-400/20 text-emerald-400"
            : "bg-primary/20 text-primary"
        }`}
      >
        {isDo ? "\u2713" : "\u2717"}
      </span>
      <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
};

/* ─── Data ─── */

const DOS = [
  "Tailwind only for all styling — no inline style attributes (exception: dynamic values)",
  "const arrow functions for all components and utilities",
  "interface for object types, not type (exception: as const derived types)",
  "cn() utility (tailwind-merge + clsx) for all conditional class composition",
  "@container queries with cqw units inside card components",
  "clamp(min, preferred, max) for all card-internal typography",
  "Named exports at file end — export { Foo }; export type { FooType }",
  "Children-based composition over slot props for complex layouts",
  "Early return pattern for readability",
  "useEffect JSDoc — always add JSDoc comment explaining the effect",
  "Percentage positioning inside cards — never pixel values",
  "prefers-reduced-motion — disable all animations when user prefers reduced motion",
];

const DONTS = [
  "No useMemo or useCallback — React 19.2+ with React Compiler handles memoization",
  "No deep relative imports — ../../.. or deeper must use path alias (@/)",
  "No inline styles for visual styling — Tailwind classes only",
  "No light mode — dark mode is the only supported theme",
  "No fixed pixels inside card components — always cqw/clamp()/percentage",
  "No CSS/SVG card backgrounds — metallic textures require raster images (PNG)",
  "No hacky workarounds — redesign the structure instead",
  "No function declarations for components — use const arrow functions",
  "No generic agent poses — each agent has a unique character pose",
  "No guessing colors — always reference tier-design.ts or globals.css tokens",
];

/* ─── Section ─── */

const DosDontsSection = () => (
  <section className="space-y-6">
    <SectionTitle id="dos-donts">7. Do&apos;s and Don&apos;ts</SectionTitle>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-emerald-500/20 bg-card p-5">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-emerald-400">
          Do
        </p>
        <div className="space-y-3">
          {DOS.map((text) => (
            <RuleItem key={text} type="do" text={text} />
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-primary/20 bg-card p-5">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
          Don&apos;t
        </p>
        <div className="space-y-3">
          {DONTS.map((text) => (
            <RuleItem key={text} type="dont" text={text} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export { DosDontsSection };
