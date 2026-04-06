import { SectionTitle, SubSectionTitle, SectionDescription, InfoCard } from "./shared";

/* ─── Pillar Card ─── */

interface PillarProps {
  icon: string;
  title: string;
  description: string;
}

const Pillar = ({ icon, title, description }: PillarProps) => (
  <div className="flex-1 rounded-lg border border-border bg-card p-5">
    <span className="text-2xl">{icon}</span>
    <p className="mt-3 text-sm font-bold uppercase tracking-widest text-foreground">
      {title}
    </p>
    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
      {description}
    </p>
  </div>
);

/* ─── Mood Chip ─── */

const MoodChip = ({ children }: { children: string }) => (
  <span className="rounded border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">
    {children}
  </span>
);

/* ─── Section ─── */

const VisualThemeSection = () => (
  <section className="space-y-8">
    <SectionTitle id="visual-theme">1. Visual Theme &amp; Atmosphere</SectionTitle>
    <SectionDescription>
      &quot;Dry elegance meets tactical FPS.&quot; — FIFA Ultimate Team의 카드 구조와 Valorant Flashback V5의 전술적 미학을 결합한 정밀 수집형 카드 시스템.
    </SectionDescription>

    {/* Three Design Pillars */}
    <div className="space-y-4">
      <SubSectionTitle>Three Design Pillars</SubSectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Pillar
          icon="🃏"
          title="Collectible Card Identity"
          description="FIFA UT 카드 구조 — 큰 OVR 숫자, 포지션 라벨, 선수 초상화, 6-stat 그리드. 카드가 주인공."
        />
        <Pillar
          icon="🎯"
          title="Tactical FPS Atmosphere"
          description="Valorant Flashback V5 비주얼 — HUD 코너 라인, 터미널 그린 진단, 레드 악센트, 다크 네이비 표면."
        />
        <Pillar
          icon="⬆️"
          title="Tier Progression"
          description="Iron에서 Radiant까지 9단계. 각 티어마다 고유한 메탈릭 텍스처 배경, 컬러 팔레트, 글로우 강도."
        />
      </div>
    </div>

    {/* Mood */}
    <div className="space-y-4">
      <SubSectionTitle>Mood</SubSectionTitle>
      <div className="flex flex-wrap gap-3">
        <MoodChip>Dark-mode only</MoodChip>
        <MoodChip>Deep navy surfaces (not pure black)</MoodChip>
        <MoodChip>Red (#FF4655) for accents only</MoodChip>
        <MoodChip>Metallic card textures (raster, not CSS)</MoodChip>
        <MoodChip>Restrained animation — no bounce/overshoot</MoodChip>
      </div>
    </div>

    {/* Design References */}
    <div className="space-y-4">
      <SubSectionTitle>Design References</SubSectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoCard title="FIFA Ultimate Team">
          Card layout, OVR placement, 6-stat grid, tier-based card frames
        </InfoCard>
        <InfoCard title="Valorant Flashback V5">
          HUD corner L-lines, V logo watermark, diagonal split backgrounds, Boast/Roast stat bars, large counter numbers, S2E markers
        </InfoCard>
      </div>
    </div>
  </section>
);

export { VisualThemeSection };
