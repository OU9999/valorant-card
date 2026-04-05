export default function DesignReferencePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-16">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Design Kit</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Valorant Card — Visual Design Reference
          </p>
        </div>

        {/* ─── Main Color ─── */}
        <section className="space-y-4">
          <SectionTitle>Main Color</SectionTitle>
          <div className="flex gap-6">
            <ColorSwatch color="#FF4655" label="Valorant Red" sub="Primary" />
          </div>
        </section>

        {/* ─── Gradient Pattern ─── */}
        <section className="space-y-4">
          <SectionTitle>Gradient Patterns</SectionTitle>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Pattern 1: Boast (Dark → Red) */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                Pattern 1 — Boast (Dark → Red)
              </p>
              <div
                className="relative flex aspect-square items-end overflow-hidden rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg, #FF4655 0%, #1A1A2E 35%, #0F1923 100%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <ValorantLogo className="h-48 w-48 text-white" />
                </div>
                <div className="relative z-10 w-full p-4">
                  <p className="text-xs text-white/50">차분하고 프리미엄한</p>
                </div>
              </div>
              <GradientStops
                stops={[
                  { color: "#FF4655", position: "0%" },
                  { color: "#1A1A2E", position: "35%" },
                  { color: "#0F1923", position: "100%" },
                ]}
              />
            </div>

            {/* Pattern 2: Roast (Red dominant) */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                Pattern 2 — Roast (Red Dominant)
              </p>
              <div
                className="relative flex aspect-square items-end overflow-hidden rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg, #1A1A2E 0%, #FF4655 30%, #FF6B6B 100%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <ValorantLogo className="h-48 w-48 text-white" />
                </div>
                <div className="relative z-10 w-full p-4">
                  <p className="text-xs text-white/50">공격적이고 강렬한</p>
                </div>
              </div>
              <GradientStops
                stops={[
                  { color: "#1A1A2E", position: "0%" },
                  { color: "#FF4655", position: "30%" },
                  { color: "#FF6B6B", position: "100%" },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ─── Sub Components ─── */

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    <div className="h-6 w-1 bg-[#FF4655]" />
    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
      {children}
    </h2>
  </div>
);

interface ColorSwatchProps {
  color: string;
  label: string;
  sub: string;
}

const ColorSwatch = ({ color, label, sub }: ColorSwatchProps) => (
  <div className="space-y-2">
    <div
      className="h-24 w-24 rounded-lg border border-border"
      style={{ backgroundColor: color }}
    />
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="font-mono text-xs text-muted-foreground">{color}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  </div>
);

interface GradientStop {
  color: string;
  position: string;
}

const GradientStops = ({ stops }: { stops: GradientStop[] }) => (
  <div className="flex gap-3">
    {stops.map((stop) => (
      <div key={`${stop.color}-${stop.position}`} className="flex items-center gap-1.5">
        <div
          className="h-3 w-3 rounded-full border border-border"
          style={{ backgroundColor: stop.color }}
        />
        <span className="font-mono text-xs text-muted-foreground">
          {stop.color} {stop.position}
        </span>
      </div>
    ))}
  </div>
);

const ValorantLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <polygon points="50,5 95,95 50,70" />
    <polygon points="5,50 45,95 45,70 20,65" />
  </svg>
);
