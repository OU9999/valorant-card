interface TestLayoutProps {
  cardArea: React.ReactNode;
  sidePanel: React.ReactNode;
}

const TestLayout = ({ cardArea, sidePanel }: TestLayoutProps) => (
  <div className="flex min-h-screen bg-gray-950">
    <div className="flex flex-1 items-center justify-center overflow-hidden">
      {cardArea}
    </div>
    <div className="flex w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-white/10 bg-gray-900 p-6">
      {sidePanel}
    </div>
  </div>
);

export { TestLayout };
export type { TestLayoutProps };
