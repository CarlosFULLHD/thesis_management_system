import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  alt?: string; // Adds an optional alt attribute, this is for Logo ucb
};
