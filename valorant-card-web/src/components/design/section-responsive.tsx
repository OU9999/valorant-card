import { SectionTitle, SubSectionTitle, SimpleTable, InfoCard } from "./shared";

/* ─── Breakpoint Bar ─── */

interface BreakpointBarProps {
  label: string;
  width: string;
  minWidth: string;
}

const BreakpointBar = ({ label, width, minWidth }: BreakpointBarProps) => (
  <div className="flex items-center gap-3">
    <span className="w-16 text-right text-xs font-bold text-foreground">{label}</span>
    <div className="flex-1">
      <div
        className="flex h-6 items-center rounded bg-primary/20 px-2"
        style={{ width }}
      >
        <span className="font-mono text-[10px] text-primary">{minWidth}</span>
      </div>
    </div>
  </div>
);

/* ─── Section ─── */

const ResponsiveSection = () => (
  <section className="space-y-8">
    <SectionTitle id="responsive">8. Responsive Behavior</SectionTitle>

    {/* Breakpoints */}
    <div className="space-y-4">
      <SubSectionTitle>Breakpoints (Tailwind v4, Mobile-First)</SubSectionTitle>
      <div className="space-y-2">
        <BreakpointBar label="Default" width="20%" minWidth="0px" />
        <BreakpointBar label="sm" width="40%" minWidth="640px" />
        <BreakpointBar label="md" width="60%" minWidth="768px" />
        <BreakpointBar label="lg" width="80%" minWidth="1024px" />
      </div>
      <SimpleTable
        headers={["Breakpoint", "Min Width", "Usage"]}
        rows={[
          ["Default", "0px", "Mobile — single column, stacked layout"],
          ["sm", "640px", "Stat grid 3 columns, padding increases"],
          ["md", "768px", "Hero 55/45 split, side-by-side layouts"],
          ["lg", "1024px", "Full desktop layout"],
        ]}
      />
    </div>

    {/* Container Query System */}
    <div className="space-y-4">
      <SubSectionTitle>Container Query System</SubSectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoCard title="Default Mode">
          카드가 전체 크기로 렌더링 (carousel, detail). 더 넓은 clamp 범위 사용.
        </InfoCard>
        <InfoCard title="SM Mode">
          카드가 컴팩트 컨텍스트에서 렌더링 (hero 3-column). 더 좁은 clamp 범위, 조정된 포지셔닝.
        </InfoCard>
      </div>
    </div>

    {/* Accessibility */}
    <div className="space-y-4">
      <SubSectionTitle>Accessibility</SubSectionTitle>
      <div className="space-y-3">
        {[
          {
            label: "prefers-reduced-motion: reduce",
            desc: "모든 scroll 애니메이션, column 진입 애니메이션, hover transition 비활성화",
          },
          {
            label: "Hover pause",
            desc: "무한 스크롤이 hover 시 일시 정지 (animation-play-state: paused)",
          },
          {
            label: "Alt text",
            desc: '모든 이미지에 설명적 alt 속성 ("agent portrait", "Iron tier icon")',
          },
          {
            label: "Semantic HTML",
            desc: "섹션 제목은 h2, h3 계층 구조 사용",
          },
          {
            label: "Touch targets",
            desc: "Badge, button 요소는 padding으로 최소 터치 영역 유지",
          },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-white">
              ✓
            </span>
            <div>
              <p className="text-xs font-bold text-foreground">{item.label}</p>
              <p className="text-[10px] text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export { ResponsiveSection };
