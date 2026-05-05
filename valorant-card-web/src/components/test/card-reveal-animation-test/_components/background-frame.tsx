import type { ReactElement } from "react";

const BackgroundFrame = (): ReactElement => (
  <div aria-hidden className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(135deg,transparent_0_48%,rgba(255,255,255,0.04)_48%_49%,transparent_49%_100%)] opacity-80 [background-size:100%_100%,56px_56px,56px_56px,180px_180px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,9,15,0.18)_48%,rgba(4,9,15,0.72)_100%)]" />
  </div>
);

export { BackgroundFrame };
