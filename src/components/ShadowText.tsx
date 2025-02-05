import { ReactNode } from "react";

import { cn } from "../utils";

export const ShadowText = (props: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "text-offwhite drop-shadow-hard-sm text-4xl select-none",
        props.className,
      )}
    >
      {props.children}
    </span>
  );
};
