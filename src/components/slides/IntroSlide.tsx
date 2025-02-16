import { motion } from "motion/react";

import { DottedCircle } from "../DottedCircle";
import { ShadowText } from "../ShadowText";

export const IntroSlide = () => {
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
