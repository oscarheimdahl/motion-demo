import { useState } from "react";

import { motion } from "motion/react";

import { cn } from "../utils";

// https://www.ray.so/#width=520&padding=16&background=false&theme=candy
export const CodeImage = (props: { src: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid w-fit [&>img]:[grid-area:1/1]">
      {/* Image clone to prevent layout shift on open */}
      <img
        src={props.src}
        alt="code image"
        aria-hidden
        className={cn("pointer-events-none opacity-0")}
      />

      <motion.div
        animate={{
          opacity: open ? 1 : 0,
        }}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 h-full w-full backdrop-blur-lg",
          open ? "pointer-events-all" : "pointer-events-none",
        )}
      />

      <motion.img
        layout
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{
          scale: 0.98,
        }}
        className={cn(
          "select-none",
          open &&
            "fixed inset-0 mx-auto my-auto size-auto max-h-full max-w-full rounded-3xl",
        )}
        draggable={false}
        src={props.src}
        alt="code image"
      />
    </div>
  );
};
