import { useEffect, useState } from "react";

import { motion } from "motion/react";

import { ShadowText, ShadowTextHeader } from "../ShadowText";

export const SpringSlide = () => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <motion.div
        className="absolute z-30"
        animate={{
          scale: 0.8,
          translateY: "-40vh",
          transition: {
            delay: 3,
            type: "spring",
            damping: 7,
          },
        }}
      >
        <motion.div
          className="flex"
          initial={{ translateY: "40vh", opacity: 0 }}
          animate={{
            translateY: "0",
            opacity: 1,
            transition: {
              delay: 0.5,
              type: "spring",
              damping: 2,
            },
          }}
        >
          {"Spring".split("").map((char, i) => (
            <motion.div
              className="inline-block"
              initial={{ margin: "0px 40px 40px 0px" }}
              animate={{
                margin: "0px 0px 30px 0px",
                transition: {
                  delay: 0.5,
                  type: "spring",
                  damping: 2,
                },
              }}
            >
              <ShadowTextHeader key={i}>{char}</ShadowTextHeader>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className="size-full"
        initial={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <SpringDemo />
      </motion.div>
    </div>
  );
};

const SpringDemo = () => {
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  const [stiffness, setStiffness] = useState(100);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 30);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex size-full items-center justify-center gap-36">
      <div className="flex w-full max-w-sm flex-col gap-15">
        <Slider
          min={0}
          max={40}
          label="Damping"
          value={damping}
          setValue={setDamping}
        />
        <Slider
          min={0}
          max={100}
          label="Mass"
          value={mass}
          setValue={setMass}
        />
        <Slider
          min={0}
          max={300}
          label="Stiffness"
          value={stiffness}
          setValue={setStiffness}
        />
      </div>
      <div className="grid place-items-center [&>div]:[grid-area:1/1]">
        <div className="drop-shadow-hard-xl">
          <motion.div
            className="size-52 rounded-md bg-violet-600"
            animate={{
              rotate: rotation + 30,
              transition: {
                type: "spring",
                // bounce,
                damping,
                mass,
                stiffness,
              },
            }}
          ></motion.div>
        </div>
        <div className="drop-shadow-hard-lg">
          <motion.div
            className="size-28 translate-x-14 translate-y-12 rounded-md bg-emerald-500"
            animate={{
              rotate: rotation,
              transition: {
                type: "spring",
                // bounce,
                damping,
                mass,
                stiffness,
              },
            }}
          ></motion.div>
        </div>
        <div className="drop-shadow-hard">
          <motion.div
            className="size-20 -translate-x-16 -translate-y-16 rounded-md bg-orange-400"
            animate={{
              rotate: rotation + 60,
              transition: {
                type: "spring",
                // bounce,
                damping,
                mass,
                stiffness,
              },
            }}
          ></motion.div>
        </div>
        <div className="drop-shadow-hard">
          <motion.div
            className="size-10 -translate-y-16 translate-x-16 rounded-md bg-yellow-400"
            animate={{
              rotate: rotation + 60,
              transition: {
                type: "spring",
                // bounce,
                damping,
                mass,
                stiffness,
              },
            }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export const Slider = (props: {
  label: string;
  value: number;
  min: number;
  max: number;
  setValue: (value: number) => void;
}) => {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <label
        className="flex w-full justify-between px-12"
        htmlFor={props.label}
      >
        <ShadowText className="drop-shadow-hard-sm text-2xl font-black">
          {props.label}
        </ShadowText>
        <ShadowText className="drop-shadow-hard-sm text-right text-2xl font-black">
          {props.value}
        </ShadowText>
      </label>
      <input
        id={props.label}
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={(e) => props.setValue(Number(e.target.value))}
        className="border-gray bg-offwhite h-2 min-w-xs rounded-full border-3 border-none accent-rose-800 outline-none"
        type="range"
      />
    </div>
  );
};
