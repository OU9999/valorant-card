const SiteBackground = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
  >
    <svg
      className="h-full w-full"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="vc-bg-base" cx="50%" cy="42%" r="78%">
          <stop offset="0%" stopColor="#0E1D34" />
          <stop offset="60%" stopColor="#091529" />
          <stop offset="100%" stopColor="#060D1B" />
        </radialGradient>

        <linearGradient id="vc-bg-soft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A2B49" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0E1B30" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="vc-bg-edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E4470" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0E1B30" stopOpacity="0" />
        </linearGradient>

        <g id="vc-bg-corner">
          <path d="M0 0 L600 0 L0 470 Z" fill="url(#vc-bg-soft)" />
          <path d="M0 0 L380 0 L0 300 Z" fill="url(#vc-bg-soft)" opacity="0.6" />
          <path d="M555 0 L600 0 L0 470 L0 430 Z" fill="url(#vc-bg-edge)" />

          <g
            stroke="#3D567E"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="0.5 11"
            opacity="0.55"
          >
            <line x1="0" y1="220" x2="280" y2="0" />
            <line x1="0" y1="280" x2="350" y2="0" />
            <line x1="0" y1="340" x2="420" y2="0" />
          </g>

          <path d="M70 70 L102 70 L70 102 Z" fill="#3D567E" opacity="0.55" />
          <path d="M40 200 L66 200 L40 226 Z" fill="#3D567E" opacity="0.4" />
          <path d="M210 40 L236 40 L210 66 Z" fill="#3D567E" opacity="0.4" />
          <path d="M150 260 L170 260 L150 280 Z" fill="#3D567E" opacity="0.32" />
          <path d="M260 150 L280 150 L260 170 Z" fill="#3D567E" opacity="0.32" />

          <line
            x1="0"
            y1="510"
            x2="640"
            y2="0"
            stroke="#3D567E"
            strokeWidth="1"
            strokeDasharray="2 8"
            opacity="0.35"
          />
        </g>
      </defs>

      <rect width="1920" height="1080" fill="url(#vc-bg-base)" />

      <use href="#vc-bg-corner" />
      <use href="#vc-bg-corner" transform="translate(1920 0) scale(-1 1)" />
      <use href="#vc-bg-corner" transform="translate(0 1080) scale(1 -1)" />
      <use href="#vc-bg-corner" transform="translate(1920 1080) scale(-1 -1)" />
    </svg>
  </div>
);

export { SiteBackground };
