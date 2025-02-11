import { useEffect, useState } from "react";

import { motion } from "motion/react";

import { ShadowText } from "../ShadowText";

export const EasingsSlide = () => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-full w-full items-center justify-around">
        <div className="flex flex-col items-center">
          <div className="drop-shadow-hard-xl">
            <div
              className={
                "dotted-bg size-52 rounded-md bg-amber-500 transition-transform ease-in-out"
              }
              style={{
                transform: `translateY(${flip ? -100 : 100}px) rotate(${
                  flip ? 0 : 90
                }deg)`,
                transitionDuration: "800ms",
                transitionTimingFunction: "linear",
              }}
            />
          </div>
          <ShadowText className="mt-36">Linear</ShadowText>
        </div>
        <div className="flex flex-col items-center">
          <div className="drop-shadow-hard-xl">
            <div
              className={
                "dotted-bg size-52 rounded-md bg-red-500 transition-transform ease-in-out"
              }
              style={{
                transform: `translateY(${flip ? -100 : 100}px) rotate(${
                  flip ? 0 : 90
                }deg)`,
                transitionDuration: "800ms",
                transitionTimingFunction: "ease-out",
              }}
            />
          </div>
          <ShadowText className="mt-36">Ease Out</ShadowText>
        </div>
        <div className="flex flex-col items-center">
          <div className="drop-shadow-hard-xl">
            <motion.div
              className="dotted-bg size-52 rounded-md bg-green-600"
              transition={{
                visualDuration: 0.8,
                type: "spring",
                mass: 1,
                velocity: 0.1,
              }}
              animate={{ translateY: flip ? -100 : 100, rotate: flip ? 0 : 90 }}
            ></motion.div>
          </div>
          <ShadowText className="mt-36">Motion ✨</ShadowText>
        </div>
      </div>
    </div>
  );
};
