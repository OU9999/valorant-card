import type { SVGProps } from "react";
import { V_PATHS } from "./v-mark";
import { C_PATHS } from "./c-mark";
import { SLASH_PATH } from "./slash-mark";

interface VCMarkProps extends SVGProps<SVGSVGElement> {
  vClassName?: string;
  cClassName?: string;
  slashClassName?: string;
}

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
