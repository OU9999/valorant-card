import { VisualThemeSection } from "@/components/design/section-visual-theme";
import { ColorPaletteSection } from "@/components/design/section-color-palette";
import { TypographySection } from "@/components/design/section-typography";
import { ComponentStylesSection } from "@/components/design/section-components";
import { LayoutSection } from "@/components/design/section-layout";

/* ─── TOC ─── */

interface TocEntry {
  id: string;
  label: string;
}

const TOC_ENTRIES: TocEntry[] = [
  { id: "visual-theme", label: "1. Visual Theme" },
  { id: "color-palette", label: "2. Color Palette" },
  { id: "typography", label: "3. Typography" },
  { id: "components", label: "4. Components" },
  { id: "layout", label: "5. Layout" },
];

/* ─── Page ─── */

export default function DesignReferencePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            DESIGN KIT
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            VALORANT FC CARD — Visual Design Reference (DESIGN.md)
          </p>
        </div>

        {/* TOC */}
        <nav className="mb-12 flex flex-wrap gap-2">
          {TOC_ENTRIES.map((entry) => (
            <a
              key={entry.id}
              href={`#${entry.id}`}
              className="rounded border border-border bg-card px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {entry.label}
            </a>
          ))}
        </nav>

        {/* Sections */}
        <div className="space-y-16">
          <VisualThemeSection />
          <div className="h-px bg-border" />
          <ColorPaletteSection />
          <div className="h-px bg-border" />
          <TypographySection />
          <div className="h-px bg-border" />
          <ComponentStylesSection />
          <div className="h-px bg-border" />
          <LayoutSection />
          <div className="h-px bg-border" />
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-border pt-8">
          <p className="text-[10px] text-muted-foreground/40">
            Generated from DESIGN.md — VALORANT FC CARD Design System Reference
          </p>
        </div>
      </div>
    </div>
  );
}
