import type { SVGProps } from "react";

const V_PATHS = [
  "M5 1919 l7 -22 98 -316 98 -316 32 -102 31 -103 61 41 60 41 2 -4 3 -3 -146 -240 -146 -240 -29 -50 -29 -50 10 10 10 10 179 205 179 205 92 105 92 106 -107 369 -107 370 -198 3 -198 2 6 -21z",
  "M1056 1888 l-15 -53 -56 -195 -55 -195 0 -9 0 -9 190 253 190 253 0 4 0 3 -120 0 -119 0 -15 -52z",
  "M1100 1359 l-215 -141 -13 -7 -12 -7 -64 -214 -63 -214 -21 70 -21 69 -27 93 -28 92 -7 -2 -8 -3 -130 -152 -131 -152 0 -9 0 -9 34 -109 34 -109 46 -148 47 -147 213 0 213 0 70 228 71 227 117 375 116 375 5 18 5 17 -8 0 -8 0 -215 -141z",
];

const VMark = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 63 133 191"
    fill="currentColor"
    aria-hidden="true"
    className={className ? `overflow-hidden ${className}` : "overflow-hidden"}
    {...props}
  >
    <g transform="translate(0,257) scale(0.1,-0.1)">
      {V_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  </svg>
);

export { VMark, V_PATHS };
