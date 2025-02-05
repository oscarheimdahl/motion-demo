import { ReactNode, useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

export const SlideShow = (props: {
  slidesComponents: ReactNode[];
  index: number;
  setIndex: (index: number) => void;
  slideShowLevel: number;
}) => {
  const slides = props.slidesComponents.map((slide, i) => ({
    Slide: slide,
    id: i,
  }));

  const [direction, setDirection] = useState<"left" | "right">("right");
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const abort = new AbortController();
    document.addEventListener(
      "keydown",
      (e) => {
        const slide = (doSlide: () => void) => {
          e.stopImmediatePropagation();
          e.preventDefault();
          if (blocked) return;
          doSlide();
          setBlocked(true);
        };

        if (e.key === "ArrowLeft") {
          if (props.index === 0) return;

          slide(() => {
            setDirection("left");
            props.setIndex(props.index - 1);
          });
        }
        if (e.key === "ArrowRight") {
          if (props.index === slides.length - 1) return;

          slide(() => {
            setDirection("right");
            props.setIndex(props.index + 1);
          });
        }
      },
      {
        signal: abort.signal,
      },
    );

    return () => {
      abort.abort();
    };
  }, [blocked, props, slides.length]);

  return (
    <AnimatePresence custom={direction} initial={false} mode="popLayout">
      <motion.div
        onAnimationComplete={() => setBlocked(false)}
        custom={direction}
        initial={"initial"}
        animate={"target"}
        exit={"exit"}
        variants={{
          initial: (direction) => ({
            translateX: direction === "left" ? "-60rem" : "60rem",
            rotate: direction === "left" ? "20deg" : "-20deg",
            opacity: 0,
          }),
          target: {
            translateX: 0,
            rotate: 0,
            opacity: 1,
          },
          exit: (direction) => ({
            translateX: direction === "left" ? "60rem" : "-60rem",
            rotate: direction === "left" ? "-20deg" : "20deg",
            opacity: 0,
          }),
        }}
        key={slides[props.index].id}
      >
        {slides[props.index].Slide}
      </motion.div>
    </AnimatePresence>
  );
};
