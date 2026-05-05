import { DARK_BACKGROUND_STYLE } from "../phase-config";

const BackgroundFrame = () => (
  <div aria-hidden className="absolute inset-0">
    <div
      className="absolute inset-0 opacity-80"
      style={DARK_BACKGROUND_STYLE}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,9,15,0.18)_48%,rgba(4,9,15,0.72)_100%)]" />
  </div>
);

export { BackgroundFrame };
