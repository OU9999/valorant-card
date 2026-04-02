interface TestLayoutProps {
  cardArea: React.ReactNode;
  sidePanel: React.ReactNode;
}

const TestLayout = ({ cardArea, sidePanel }: TestLayoutProps) => (
  <div className="flex min-h-screen bg-background">
    <div className="flex flex-1 items-center justify-center overflow-hidden">
      {cardArea}
    </div>
    <div className="flex w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-border bg-card p-6">
      {sidePanel}
    </div>
  </div>
);

export { TestLayout };
export type { TestLayoutProps };
