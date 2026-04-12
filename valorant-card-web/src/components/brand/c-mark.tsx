import type { SVGProps } from "react";

const C_PATHS = [
  "M1657 1802 l-137 -137 0 -568 0 -568 52 -86 52 -87 50 56 51 56 78 85 77 84 0 425 0 424 48 47 48 47 252 0 252 0 0 -182 0 -183 180 180 180 180 0 182 0 183 -523 0 -522 0 -138 -138z",
  "M2672 1017 l-192 -192 0 -55 0 -56 -48 -47 -48 -47 -54 0 -55 0 -98 -97 -99 -98 52 98 52 97 -105 0 -105 0 -116 -125 -116 -124 0 -8 0 -8 36 -23 35 -23 -48 -54 -48 -54 -95 -102 -95 -102 11 4 10 4 246 127 245 128 269 0 269 0 133 133 132 132 0 167 0 167 -94 3 -93 3 60 95 60 95 48 78 49 77 -3 0 -2 0 -193 -193z",
];

const CMark = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="152 63 135 191"
    fill="currentColor"
    aria-hidden="true"
    className={className ? `overflow-hidden ${className}` : "overflow-hidden"}
    {...props}
  >
    <g transform="translate(0,257) scale(0.1,-0.1)">
      {C_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  </svg>
);

export { CMark };
