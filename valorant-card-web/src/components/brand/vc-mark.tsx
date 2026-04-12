import type { SVGProps } from "react";

interface VCMarkProps extends SVGProps<SVGSVGElement> {
  vClassName?: string;
  cClassName?: string;
  slashClassName?: string;
}

const V_PATHS = [
  "M5 1919 l7 -22 98 -316 98 -316 32 -102 31 -103 61 41 60 41 2 -4 3 -3 -146 -240 -146 -240 -29 -50 -29 -50 10 10 10 10 179 205 179 205 92 105 92 106 -107 369 -107 370 -198 3 -198 2 6 -21z",
  "M1056 1888 l-15 -53 -56 -195 -55 -195 0 -9 0 -9 190 253 190 253 0 4 0 3 -120 0 -119 0 -15 -52z",
  "M1100 1359 l-215 -141 -13 -7 -12 -7 -64 -214 -63 -214 -21 70 -21 69 -27 93 -28 92 -7 -2 -8 -3 -130 -152 -131 -152 0 -9 0 -9 34 -109 34 -109 46 -148 47 -147 213 0 213 0 70 228 71 227 117 375 116 375 5 18 5 17 -8 0 -8 0 -215 -141z",
];

const C_PATHS = [
  "M1657 1802 l-137 -137 0 -568 0 -568 52 -86 52 -87 50 56 51 56 78 85 77 84 0 425 0 424 48 47 48 47 252 0 252 0 0 -182 0 -183 180 180 180 180 0 182 0 183 -523 0 -522 0 -138 -138z",
  "M2672 1017 l-192 -192 0 -55 0 -56 -48 -47 -48 -47 -54 0 -55 0 -98 -97 -99 -98 52 98 52 97 -105 0 -105 0 -116 -125 -116 -124 0 -8 0 -8 36 -23 35 -23 -48 -54 -48 -54 -95 -102 -95 -102 11 4 10 4 246 127 245 128 269 0 269 0 133 133 132 132 0 167 0 167 -94 3 -93 3 60 95 60 95 48 78 49 77 -3 0 -2 0 -193 -193z",
];

const SLASH_PATH =
  "M1706 2343 l-186 -208 -261 -370 -261 -370 -66 -94 -65 -94 24 16 24 15 239 156 239 155 253 500 254 501 -4 0 -4 0 -186 -207z";

const VCMark = ({
  vClassName,
  cClassName,
  slashClassName = "text-primary",
  ...props
}: VCMarkProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 288 257"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <g transform="translate(0,257) scale(0.1,-0.1)">
      <g className={vClassName}>
        {V_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className={cClassName}>
        {C_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className={slashClassName}>
        <path d={SLASH_PATH} />
      </g>
    </g>
  </svg>
);

export { VCMark };
export type { VCMarkProps };
