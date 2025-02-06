import { motion } from "motion/react";

import { cn } from "../../utils";
import { ShadowText } from "../ShadowText";

export const Slide1 = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-36">
      <div className="flex aspect-square flex-col items-center justify-center gap-1">
        <DottedCircle />
        <motion.div
          initial={"hidden"}
          animate={"visible"}
          variants={{
            hidden: {
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            },
            visible: {
              opacity: 1,
              transition: {
                delay: 1.5,
                duration: 0.5,
                staggerChildren: 0.1,
                when: "beforeChildren",
              },
            },
          }}
        >
          <motion.div
            className="relative -mb-2 w-fit translate-x-1"
            transition={{
              duration: 1,
            }}
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 0.6,
              },
            }}
          >
            <ShadowText className="drop-shadow-hard-lg w-fit text-5xl font-black mix-blend-plus-darker">
              Framer
            </ShadowText>
          </motion.div>
          {"Motion".split("").map((char, i) => {
            return (
              <motion.div
                className="inline-block"
                variants={{
                  hidden: {
                    opacity: 0,
                    translateY: 100,
                    rotate: 90,
                  },
                  visible: {
                    opacity: 1,
                    translateY: 0,
                    rotate: 0,
                  },
                }}
                key={i}
              >
                <ShadowText className="drop-shadow-hard-xl text-9xl font-black">
                  {char}
                </ShadowText>
              </motion.div>
            );
          })}
          <motion.div
            className="flex"
            transition={{
              duration: 0.8,
              delay: 1,
              type: "spring",
              bounce: 0.5,
            }}
            variants={{
              hidden: {
                opacity: 0,
                scale: 0,
              },
              visible: {
                opacity: 1,
                scale: 1,
              },
            }}
          >
            <ShadowText className="ml-auto">the Animation Library</ShadowText>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export const DottedCircle = () => {
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
      className="absolute flex animate-spin items-center justify-center rounded-full bg-amber-500"
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
            className={cn("absolute size-4 rounded-full bg-amber-500")}
          />
        );
      })}
    </motion.div>
  );
};
