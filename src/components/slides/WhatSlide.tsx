import { motion } from "motion/react";

import jsSrc from "../../images/js.png";
import npmSrc from "../../images/npm.png";
import reactSrc from "../../images/react.png";
import { ShadowText } from "../ShadowText";

export const WhatSlide = () => {
  const imgVariant = {
    show: {
      opacity: 1,
      translateY: 0,
    },
    initial: {
      opacity: 0,
      translateY: 200,
    },
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <motion.div transition={{ type: "spring", bounce: 1, damping: 2 }}>
        <ShadowText className="drop-shadow-hard-xl text-7xl font-black">
          Va äre?
        </ShadowText>
      </motion.div>
      <motion.div
        variants={{}}
        transition={{ staggerChildren: 0.2, delayChildren: 1 }}
        initial={"initial"}
        animate={"show"}
        className="absolute bottom-0 flex w-full items-center justify-around overflow-hidden py-12"
      >
        <motion.img
          variants={imgVariant}
          className="w-42 select-none"
          src={npmSrc}
          alt="npm logo"
        />
        <motion.img
          variants={{
            show: {
              opacity: 1,
              translateY: 0,
            },
            initial: {
              opacity: 0,
              translateY: 200,
            },
          }}
          style={{ animationDelay: "4000ms", animationDuration: "4000ms" }}
          className="w-36 animate-spin select-none"
          src={reactSrc}
          alt="react logo"
        />
        <motion.img
          variants={imgVariant}
          className="w-32 select-none"
          src={jsSrc}
          alt="js logo"
        />
      </motion.div>
    </div>
  );
};
