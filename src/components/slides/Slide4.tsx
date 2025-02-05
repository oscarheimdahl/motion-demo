import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { ShadowText } from "../ShadowText";

export const Slide4x1 = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <motion.div
        className="absolute"
        initial={"initial"}
        animate={"animate"}
        variants={{
          initial: { filter: "blur(5px)", scale: 4 },
          animate: {
            filter: "blur(0px)",
            scale: 1,
            transition: {
              delay: 1,
              duration: 0.2,
              mass: 1.5,
              type: "spring",
              damping: 50,
              stiffness: 800,
            },
          },
        }}
      >
        <motion.div
          variants={{
            animate: {
              scale: 0.8,
              translateY: "-30vh",
              transition: {
                delay: 2,
                duration: 0.2,
                mass: 1.5,
                type: "spring",
                damping: 50,
                stiffness: 800,
                delayChildren: 2,
              },
            },
          }}
          className="flex flex-col items-center gap-4"
        >
          <ShadowText className="drop-shadow-hard-xl text-8xl font-black">
            AnimatePresence
          </ShadowText>
          <motion.button
            variants={{
              initial: {
                scale: 0,
              },
              animate: {
                scale: 1,
                transition: {
                  delay: 2.6,
                  duration: 0.3,
                },
              },
            }}
            onClick={() => setShow((prev) => !prev)}
            style={{ perspective: "1000px" }}
            className="drop-shadow-hard-lg mx-auto w-fit origin-top rounded-md bg-teal-600 px-4 py-2 text-3xl text-white transition-transform hover:translate-y-1"
          >
            Click me
          </motion.button>
        </motion.div>
      </motion.div>
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, translateY: -100 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -100 }}
              key="box"
              className="drop-shadow-hard-xl striped-bg flex size-52 items-center justify-center rounded-2xl bg-violet-700"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
