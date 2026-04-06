import { SectionTitle, SubSectionTitle, SectionDescription } from "./shared";

/* ─── Layer Visual ─── */

interface LayerProps {
  z: number;
  label: string;
  bgClass: string;
}

const LAYERS: LayerProps[] = [
  { z: 0, label: "Background (Metallic Texture)", bgClass: "bg-secondary" },
  { z: 1, label: "Portrait (Agent + Fade Mask)", bgClass: "bg-card" },
  { z: 2, label: "Bottom Gradient (Tier Color)", bgClass: "bg-primary/20" },
  { z: 3, label: "Content (OVR, Name, Stats)", bgClass: "bg-foreground/10" },
];

/* ─── Glow Sample ─── */

interface GlowSampleProps {
  label: string;
  size: string;
  shadow: string;
  color: string;
}

const GlowSample = ({ label, size, shadow, color }: GlowSampleProps) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="rounded-full"
      style={{
        width: "48px",
        height: "48px",
        backgroundColor: color,
        filter: `drop-shadow(0 0 ${size} ${color})`,
      }}
    />
    <p className="text-[10px] font-bold text-foreground">{label}</p>
    <p className="font-mono text-[10px] text-muted-foreground">{shadow}</p>
  </div>
);

/* ─── Section ─── */

const DepthSection = () => (
  <section className="space-y-8">
    <SectionTitle id="depth">6. Depth &amp; Elevation</SectionTitle>

    {/* Philosophy */}
    <SectionDescription>
      No box-shadow elevation. 깊이는 배경색 단계, 반투명 테두리, 글로우 효과, 레이어 합성으로 생성.
    </SectionDescription>

    {/* Card Internal Depth */}
    <div className="space-y-4">
      <SubSectionTitle>Card Internal Depth</SubSectionTitle>
      <div className="flex flex-col gap-2">
        {LAYERS.map((layer) => (
          <div key={layer.z} className="flex items-center gap-3">
            <span className="shrink-0 rounded bg-primary/20 px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
              Z-{layer.z}
            </span>
            <div className={`h-10 flex-1 rounded ${layer.bgClass} flex items-center px-4`}>
              <span className="text-xs text-foreground">{layer.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Glow System */}
    <div className="space-y-4">
      <SubSectionTitle>Glow System</SubSectionTitle>
      <div className="flex flex-wrap gap-8 rounded-lg border border-border bg-background p-6">
        <GlowSample
          label="Standard Tier"
          size="6px"
          shadow="0 0 6px, opacity 0.4"
          color="rgba(156,163,175,0.7)"
        />
        <GlowSample
          label="High Tier"
          size="8px"
          shadow="0 0 8px, opacity 0.5"
          color="rgba(16,185,129,0.8)"
        />
        <GlowSample
          label="Immortal"
          size="8px"
          shadow="0 0 8px, opacity 0.5"
          color="rgba(225,29,72,0.8)"
        />
        <GlowSample
          label="Radiant"
          size="8px"
          shadow="0 0 8px, opacity 0.5"
          color="rgba(212,175,55,0.7)"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded border border-border bg-card p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">OVR Text</p>
          <p className="text-lg text-foreground drop-shadow-lg">drop-shadow-lg</p>
        </div>
        <div className="rounded border border-border bg-card p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Light-bg Tier Text</p>
          <p className="text-lg text-slate-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">White shadow</p>
        </div>
        <div className="rounded border border-border bg-card p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hover</p>
          <p className="text-xs text-muted-foreground">brightness(1.08) + tier glow</p>
        </div>
      </div>
    </div>

    {/* Surface Hierarchy */}
    <div className="space-y-4">
      <SubSectionTitle>Surface Hierarchy</SubSectionTitle>
      <div className="relative rounded-lg p-6" style={{ backgroundColor: "var(--background)" }}>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Page (--background)
        </p>
        <div className="rounded-lg p-5" style={{ backgroundColor: "var(--card)" }}>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Panel (--card)
          </p>
          <div className="rounded-lg p-4" style={{ backgroundColor: "var(--secondary)" }}>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Inset (--secondary)
            </p>
            <div className="relative h-16 overflow-hidden rounded-lg" style={{ backgroundColor: "var(--background)" }}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.668_0.220_21_/_0.12)_0%,_transparent_60%)]" />
              <div className="flex h-full items-center justify-center">
                <p className="relative text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Overlay (radial-gradient primary/12%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export { DepthSection };
