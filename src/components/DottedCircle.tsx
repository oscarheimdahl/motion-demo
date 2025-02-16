import { motion } from "motion/react";

import { cn } from "../utils";

export const DottedCircle = (props: { className?: string }) => {
  const DOTS = 50; // Adjust the number of dots
  const RADIUS = 300; // Adjust based on the parent div size

  return (
    <motion.div
      initial={"initial"}
      animate={"animate"}
      variants={{
        initial: {
          opacity: 0.99,
        },
        animate: {
          opacity: 1,
          transition: {
            delay: 0.3,
            staggerChildren: 0.02,
            when: "beforeChildren",
          },
        },
      }}
      style={{ animationDuration: "50s" }}
      className={
        "absolute flex animate-spin items-center justify-center rounded-full"
      }
    >
      {Array.from({ length: DOTS }).map((_, i) => {
        const angle = (i / DOTS) * 2 * Math.PI + Math.PI;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;

        return (
          <motion.div
            variants={{
              initial: {
                scale: 0,
                translateX: x,
                translateY: y,
              },
              animate: {
                scale: 1,
                translateX: x,
                translateY: y,
                transition: {
                  type: "spring",
                  bounce: 0.7,
                },
              },
            }}
            key={i}
            className={cn(
              "absolute size-4 rounded-full bg-amber-500",
              props.className,
            )}
          />
        );
      })}
    </motion.div>
  );
};
