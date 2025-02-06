import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import animatePresenceReact from "../../images/code/animate-presence-motion.png";
import animatePresenceMotion from "../../images/code/animate-presence-react.png";
import { CodeImage } from "../CodeImage";
import { ShadowTextHeader } from "../ShadowText";
import { SlideShow } from "../SlideShow";

export const Slide4 = () => {
  const [index, setIndex] = useState(0);

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
              translateY: "-40vh",
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
          <ShadowTextHeader>AnimatePresence</ShadowTextHeader>
        </motion.div>
      </motion.div>
      <SlideShow
        index={index}
        setIndex={setIndex}
        slidesComponents={[<Slide4x1 />, <Slide4x2 />]}
      ></SlideShow>
    </div>
  );
};

export const Slide4x1 = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, translateY: -100 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -100 }}
            // key="box"
            className="drop-shadow-hard-xl striped-bg flex size-52 items-center justify-center rounded-2xl bg-violet-700"
          ></motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={handleClick}
        className="drop-shadow-hard-lg absolute bottom-12 left-1/2 mx-auto w-fit origin-top -translate-x-1/2 rounded-md bg-teal-600 px-4 py-2 text-3xl text-white transition-transform hover:translate-y-1"
      >
        Click me
      </motion.button>
    </div>
  );
};

export const Slide4x2 = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="max-w-xl">
        <CodeImage src={animatePresenceReact} />
      </div>
      <div className="max-w-xl">
        <CodeImage src={animatePresenceMotion} />
      </div>
    </div>
  );
};
