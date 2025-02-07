import { useState } from "react";

import { motion } from "motion/react";

import apiAdvanced from "../../images/code/api-advanced.png";
import apiSimple from "../../images/code/api-simple.png";
import { CodeImage } from "../CodeImage";
import { SlideShow } from "../SlideShow";

export const ApiSlide = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SlideShow
        index={index}
        setIndex={setIndex}
        slidesComponents={[<Simple />, <Advanced />]}
      />
    </div>
  );
};

const Simple = () => {
  return (
    <div className="flex items-center gap-36">
      <motion.div
        className="drop-shadow-hard-lg size-24 rounded-lg bg-red-500"
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          rotate: 0,
          transition: {
            type: "spring",
            duration: 0.5,
            delay: 0.5,
          },
        }}
        whileHover={{ scale: 2, rotate: 10 }}
      />
      <div className="max-w-xl">
        <CodeImage src={apiSimple} />
      </div>
    </div>
  );
};

const Advanced = () => {
  return (
    <div className="flex items-center gap-36">
      <motion.div
        className="drop-shadow-hard-lg relative grid size-fit grid-cols-4 gap-3 rounded-2xl bg-amber-500 p-6"
        variants={{
          default: {},
          doTheThing: {
            scale: 1.1,
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        initial="default"
        whileHover={"doTheThing"}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="pointer-events-none size-4 rounded-md bg-amber-700"
            variants={{
              default: {
                translateX: 0,
                translateY: 0,
              },
              doTheThing: {
                translateX: Math.random() * 400 - 200,
                translateY: Math.random() * 400 - 200,
              },
            }}
            transition={{
              type: "spring",
              duration: 0.5,
            }}
          />
        ))}
      </motion.div>
      <div className="max-w-xl">
        <CodeImage src={apiAdvanced} />
      </div>
    </div>
  );
};
