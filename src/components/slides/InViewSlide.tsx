import { useRef, useState } from "react";

import { ArrowUp } from "lucide-react";
import { motion, useScroll } from "motion/react";

import whileInView from "../../images/code/whileInView.png";
import { CodeImage } from "../CodeImage";
import { ShadowTextHeader } from "../ShadowText";
import { SlideShow } from "../SlideShow";

export const InViewSlide = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <motion.div
        className="absolute z-30"
        initial={{ translateY: "40vh" }}
        animate={{
          scale: 0.8,
          translateY: "-40vh",
          transition: {
            duration: 2.5,
            type: "tween",
          },
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: 90 }}
          animate={{
            scale: 0.8,
            rotate: 0,
            transition: {
              visualDuration: 3,
              type: "spring",
              delayChildren: 2,
            },
          }}
        >
          <ShadowTextHeader>Scrolling</ShadowTextHeader>
        </motion.div>
      </motion.div>
      <motion.div
        className="size-full"
        initial={{ filter: "blur(100px)", opacity: 0 }}
        animate={{ filter: "blur(0)", opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <SlideShow
          index={index}
          setIndex={setIndex}
          slidesComponents={[<Slide1 />, <Slide2 />]}
        />
      </motion.div>
    </div>
  );
};

const Slide1 = () => {
  return (
    <div className="flex size-full items-center gap-12">
      <Scrollers />
      <div className="z-50 max-w-xl">
        <CodeImage src={whileInView} />
      </div>
    </div>
  );
};

const Scrollers = () => {
  return (
    <div className="flex size-full justify-around">
      <div className="hide-scrollbar h-full w-full overflow-y-scroll">
        <div className="flex flex-col items-center justify-center gap-12 p-12 pt-[95vh]">
          <ArrowUp className="text-gray -mt-12 opacity-50" />
          {Array.from({ length: 50 }).map((_, i) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  translateX: 0,
                  opacity: 1,
                  transition: { duration: 1.5, type: "spring" },
                }}
                key={i}
                className="drop-shadow-hard-lg dotted-bg h-36 w-full max-w-72 rounded-2xl bg-amber-500"
              ></motion.div>
            );
          })}
        </div>
      </div>
      <div className="hide-scrollbar h-full w-full overflow-y-scroll">
        <div className="flex flex-col items-center justify-center gap-12 p-12 pt-[95vh]">
          <ArrowUp className="text-gray -mt-12 opacity-50" />
          {Array.from({ length: 50 }).map((_, i) => {
            return (
              <motion.div
                initial={{
                  rotate: i === 0 ? 0 : -90,
                  translateY: i === 0 ? 0 : 100,
                }}
                whileInView={{
                  rotate: 0,
                  translateY: 0,
                  transition: { duration: 0.6, type: "spring" },
                }}
                viewport={{ once: true }}
                key={i}
                className="drop-shadow-hard-lg dotted-bg h-36 w-full max-w-72 rounded-2xl bg-emerald-500"
              ></motion.div>
            );
          })}
        </div>
      </div>

      <div className="hide-scrollbar h-full w-full overflow-y-scroll">
        <div className="flex flex-col items-center justify-center gap-12 p-12 pt-[95vh]">
          <ArrowUp className="text-gray -mt-12 opacity-50" />

          {Array.from({ length: 50 }).map((_, i) => {
            return (
              <motion.div
                initial={{ scale: 0.4 }}
                viewport={{ margin: "-500px 0px 0px 0px" }}
                whileInView={{
                  scale: 1,
                }}
                key={i}
                className="drop-shadow-hard-lg dotted-bg h-36 w-full max-w-72 rounded-2xl bg-rose-600"
              ></motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Slide2 = () => {
  return (
    <div className="flex size-full items-center gap-12">
      <CatFeed />
      <div className="z-50 max-w-xl">
        <CodeImage src={whileInView} />
      </div>
    </div>
  );
};

export const CatFeed = () => {
  return (
    <div className="flex size-full justify-around">
      <div className="hide-scrollbar h-full w-full overflow-y-scroll">
        <div className="flex flex-col items-center justify-center gap-12 p-12 py-[95vh]">
          <ArrowUp className="text-gray -mt-12 opacity-50" />
          {Array.from({ length: 5 }).map((_, i) => {
            return <ScrollBox key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

const ScrollBox = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const [progress, setProgress] = useState(0);

  scrollYProgress.on("change", (progress) => {
    setProgress(progress);
  });
  return (
    <motion.div
      ref={ref}
      className="drop-shadow-hard-lg dotted-bg h-36 w-full max-w-72 rounded-2xl bg-amber-500"
    >
      {" "}
      {progress}
    </motion.div>
  );
};
