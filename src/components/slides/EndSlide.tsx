import { Heart } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "../../utils";
import { DottedCircle } from "../DottedCircle";
import { ShadowTextHeader } from "../ShadowText";

export const QuoteSlide = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-36">
      <div className="flex aspect-square flex-col items-center justify-center gap-1">
        <DottedCircle className="bg-black/20" />
        <motion.div
          className="mt-36"
          initial={"initial"}
          animate={"show"}
          variants={{
            show: { transition: { staggerChildren: 0.02, delayChildren: 2 } },
          }}
        >
          <ShadowTextHeader className="mt-36 text-6xl italic">
            {`"Makes hard things easy, and easy things great."`
              .split("")
              .map((char, i) => {
                return (
                  <>
                    <motion.div
                      className={cn("inline-block", char === " " && "w-3")}
                      key={i}
                      variants={{
                        initial: { opacity: 0, rotate: 20 },
                        show: {
                          opacity: 1,
                          rotate: 0,
                          transition: { type: "spring" },
                        },
                      }}
                    >
                      {char}
                    </motion.div>
                    {char === "," && <br />}
                  </>
                );
              })}
          </ShadowTextHeader>
        </motion.div>
        <motion.div
          className="relative mt-16 ml-auto"
          initial={{ opacity: 0, translateX: 300 }}
          animate={{
            translateX: 0,
            opacity: 1,
            transition: { type: "spring", duration: 0.4, delay: 4 },
          }}
        >
          <ShadowTextHeader className="!drop-shadow-hard-lg text-4xl italic">
            - Oscar Heimdahl
          </ShadowTextHeader>
          <motion.div
            className="absolute top-1/2 -left-4 h-1 w-[calc(100%+2rem)] -translate-y-1/2 rounded-full bg-red-500"
            initial={{ opacity: 0, translateX: 300 }}
            animate={{
              translateX: 0,
              opacity: 1,
              transition: { type: "spring", duration: 0.4, delay: 5 },
            }}
          ></motion.div>
        </motion.div>
        <motion.div
          className="mt-4 ml-auto"
          initial={{ opacity: 0, translateX: 300 }}
          animate={{
            translateX: 0,
            opacity: 1,
            transition: { type: "spring", duration: 0.4, delay: 5 },
          }}
        >
          <ShadowTextHeader className="!drop-shadow-hard-lg ml-auto text-4xl italic">
            - Michael Scott
          </ShadowTextHeader>
        </motion.div>
      </div>
    </div>
  );
};

export const EndSlide = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex items-center text-6xl font-black text-[#1D5EB0]">
        Tack
        <Heart className="inline-block size-16 fill-[#1D5EB0] stroke-transparent" />
      </div>
    </div>
  );
};
