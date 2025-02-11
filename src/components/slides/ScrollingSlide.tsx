import { RefObject, useRef, useState } from "react";

import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import useScrollImage from "../../images/code/useScroll.png";
import whileInView from "../../images/code/whileInView.png";
import { CodeImage } from "../CodeImage";
import { ShadowText, ShadowTextHeader } from "../ShadowText";
import { SlideShow } from "../SlideShow";

export const ScrollingSlide = () => {
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
        initial={{ filter: "blur(100px)", opacity: 0, translateY: 100 }}
        animate={{ filter: "blur(0)", opacity: 1, translateY: 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <SlideShow
          index={index}
          setIndex={setIndex}
          slidesComponents={[<Slide1 />, <Slide2 />, <Slide3 />]}
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
    <div className="flex size-full items-center justify-around gap-12">
      <ScrollHooksExample />
      <div className="z-50 max-w-xl">
        <CodeImage src={useScrollImage} />
      </div>
    </div>
  );
};

export const ScrollHooksExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      className="hide-scrollbar h-full w-fit overflow-y-scroll"
    >
      <div className="flex flex-col items-center justify-center gap-12 p-12 py-[95vh]">
        <ScrollHooksExampleBox containerRef={containerRef} />
      </div>
    </div>
  );
};

const ScrollHooksExampleBox = (props: {
  containerRef: RefObject<HTMLDivElement>;
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [springProgress, setSpringProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: props.containerRef,
    offset: ["end end", "start start"],
  });

  const springValue = useSpring(scrollYProgress, {
    bounce: 0.8,
    damping: 7,
    mass: 0.5,
    stiffness: 100,
  });

  scrollYProgress.on("change", (value) => {
    setProgress(value);
  });

  springValue.on("change", (value) => {
    setSpringProgress(value);
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const widthSpring = useTransform(springValue, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={targetRef}
      className="drop-shadow-hard-lg striped-bg flex h-36 w-72 flex-col items-center justify-center gap-2 rounded-2xl bg-slate-700"
    >
      <ShadowText>{progress.toFixed(2)}</ShadowText>
      <motion.div
        style={{ width }}
        className="drop-shadow-hard-sm h-4 w-full rounded-full bg-rose-600"
      />

      <motion.div
        style={{ width: widthSpring }}
        className="drop-shadow-hard-sm h-4 w-full rounded-full bg-amber-500"
      />
      <ShadowText>{springProgress.toFixed(2)}</ShadowText>
    </motion.div>
  );
};

export const Slide3 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const images = import.meta.glob<{ default: string }>(
    "../../images/cats/*.jpg",
    { eager: true },
  );
  const srcs = Object.values(images).map((image) => image.default);

  return (
    <div
      ref={containerRef}
      className="hide-scrollbar size-full overflow-y-scroll"
    >
      <div className="flex flex-col items-center justify-center p-12 py-[75%]">
        {srcs.map((src, i) => {
          return (
            <CatImage
              src={src}
              direction={i % 2 === 0 ? 1 : -1}
              key={i}
              containerRef={containerRef}
            />
          );
        })}
      </div>
    </div>
  );
};

const CatImage = (props: {
  containerRef: RefObject<HTMLDivElement>;
  direction: -1 | 1;
  src: string;
}) => {
  const dir = props.direction;
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: props.containerRef,
    offset: ["end end", "start start"],
  });

  const springValue = useSpring(scrollYProgress, {
    bounce: 0.2,
  });

  const scale = useTransform(
    springValue,
    [0, 0.4, 0.6, 1],
    ["0.6", "1", "1", "0.6"],
  );

  const offsetY = useTransform(
    springValue,
    [0, 0.4, 0.8, 1],
    ["100px", "0px", "0px", "-400px"],
  );
  const offsetX = useTransform(
    springValue,
    [0, 0.7, 1],
    [`0px`, "0px", `${400 * dir}px`],
  );
  const rotation = useTransform(
    springValue,
    [0.7, 1],
    ["0deg", `${90 * dir}deg`],
  );
  const saturation = useTransform(
    springValue,
    [0, 0.4, 0.8, 1],
    ["saturate(1)", "saturate(1.5)", "saturate(1.5)", "saturate(1)"],
  );

  return (
    <motion.div
      style={{
        rotate: rotation,
        scale,
        translateY: offsetY,
        translateX: offsetX,
        filter: saturation,
      }}
      ref={targetRef}
      className="drop-shadow-hard-xl -my-10"
    >
      <motion.div
        className="bg-offwhite relative overflow-hidden rounded-[1px] p-4 pb-15 drop-shadow-lg"
        style={{
          rotate: `${dir * 1}deg`,
          boxShadow: "0 0 4px rgba(0,0,0, 0.2)",
        }}
      >
        <img src={props.src} alt="cat" className="size-[300px]"></img>
      </motion.div>
    </motion.div>
  );
};
