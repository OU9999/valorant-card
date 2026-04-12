import type { SVGProps } from "react";

const SLASH_PATH =
  "M1706 2343 l-186 -208 -261 -370 -261 -370 -66 -94 -65 -94 24 16 24 15 239 156 239 155 253 500 254 501 -4 0 -4 0 -186 -207z";

const SlashMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="87 2 103 134"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <g transform="translate(0,257) scale(0.1,-0.1)">
      <path d={SLASH_PATH} />
    </g>
  </svg>
);

export { SlashMark, SLASH_PATH };
