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
            {/* Pattern 1: Boast */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                Pattern 1 — Boast (Dark)
              </p>
              <div className="overflow-hidden rounded-lg border border-[#2A1520] bg-[#0F1923]">
                <div className="flex flex-col gap-3 p-5">
                  <StatBar
                    variant="boast"
                    label="함께 가장 많이 승리한 플레이어"
                    value="DRX HYUNBIN"
                  />
                  <StatBar
                    variant="boast"
                    label="가장 많이 지원한 플레이어"
                    value="DRX HYUNBIN"
                  />
                  <StatBar
                    variant="boast"
                    label="헤드샷 확률이 가장 높은 플레이어"
                    value="HEARTSPING"
                  />
                  <StatBar
                    variant="boast"
                    label="최후의 플레이어"
                    value="DRX HYUNBIN"
                  />
                </div>
              </div>
              <GradientStops
                stops={[
                  { color: "#FF4655", position: "left border" },
                  { color: "#3D0F18", position: "bar start" },
                  { color: "#1A0A10", position: "bar end" },
                ]}
              />
            </div>

            {/* Pattern 2: Roast */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                Pattern 2 — Roast (Red Dominant)
              </p>
              <div className="overflow-hidden rounded-lg border border-[#FF4655]/30 bg-[#FF4655]">
                <div className="flex flex-col gap-3 p-5">
                  <StatBar
                    variant="roast"
                    label="함께 가장 많이 패배한 플레이어"
                    value="DRX HYUNBIN"
                  />
                  <StatBar
                    variant="roast"
                    label="나를 가장 많이 지원한 플레이어"
                    value="DRX HYUNBIN"
                  />
                  <StatBar
                    variant="roast"
                    label="헤드샷 확률이 가장 낮은 플레이어"
                    value="MYMELODY"
                  />
                  <StatBar
                    variant="roast"
                    label="가장 적게 마지막까지 남은 플레이어"
                    value="코코베어"
                  />
                </div>
              </div>
              <GradientStops
                stops={[
                  { color: "#FF4655", position: "left border" },
                  { color: "#CC2233", position: "bar start" },
                  { color: "#8B1A2B", position: "bar end" },
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

interface StatBarProps {
  variant: "boast" | "roast";
  label: string;
  value: string;
}

const StatBar = ({ variant, label, value }: StatBarProps) => {
  const isBoast = variant === "boast";

  return (
    <div
      className="border-l-2 border-[#FF4655] px-5 pb-4 pt-3"
      style={{
        background: isBoast
          ? "linear-gradient(180deg, rgba(255,70,85,0) 0%, rgba(255,70,85,0.4) 100%)"
          : "linear-gradient(180deg, rgba(20,0,5,0) 0%, rgba(20,0,5,0.5) 100%)",
      }}
    >
      <p className={`text-xs ${isBoast ? "text-white/70" : "text-[#6B1525]"}`}>
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-bold tracking-wide ${isBoast ? "text-white" : "text-[#1A0008]"}`}
      >
        {value}
      </p>
    </div>
  );
};

interface GradientStop {
  color: string;
  position: string;
}

const GradientStops = ({ stops }: { stops: GradientStop[] }) => (
  <div className="flex flex-wrap gap-3">
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
