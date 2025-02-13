import { forwardRef, useEffect, useState } from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { motion } from "motion/react";

import { cn } from "../../utils";
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
            delay: 2,
            type: "spring",
            damping: 7,
          },
        }}
      >
        <motion.div className="flex">
          {"Spring".split("").map((char, i) => (
            <motion.div
              className="inline-block origin-center"
              initial={{ margin: "0px 25px 25px 0px" }}
              animate={{
                scale: 1,
                margin: "0px 5px 5px 0px",
                transition: {
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
  const [mass, setMass] = useState(2);
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
        <Slider min={1} max={10} label="Mass" value={mass} setValue={setMass} />
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
    <div className="relative flex flex-col items-center gap-3">
      <label
        className="flex w-full items-center justify-between px-4"
        htmlFor={props.label}
      >
        <ShadowText className="drop-shadow-hard-sm text-2xl font-black">
          {props.label}
        </ShadowText>
        <ShadowText className="drop-shadow-hard-sm text-right text-xl font-black">
          {props.value}
        </ShadowText>
      </label>
      <SliderShadCn
        id={props.label}
        min={props.min}
        max={props.max}
        value={[props.value]}
        onValueChange={(value) => props.setValue(Number(value[0]))}
      />
    </div>
  );
};

const SliderShadCn = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "drop-shadow-hard relative flex w-full touch-none items-center select-none",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-400">
      <SliderPrimitive.Range className="bg-offwhite absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="ring-offset-background block h-5 w-5 rounded-full border-2 border-white bg-emerald-500 shadow-md transition-colors focus:border-1 focus:border-none focus:ring-transparent focus-visible:border-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
