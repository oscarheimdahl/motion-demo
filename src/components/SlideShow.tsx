import { ReactNode, useEffect, useRef, useState } from "react";

import { atom, useAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";

// Keeps track of the nested slideshow, and makes sure only the outermost one get the keyboard events.
const slideShowsAtom = atom<string[]>([]);

export const SlideShow = (props: {
  slidesComponents: ReactNode[];
  index: number;
  setIndex: (index: number) => void;
}) => {
  const id = useRef(crypto.randomUUID());
  const [activeSlideShows, setActiveSlideShows] = useAtom(slideShowsAtom);

  const [blocked, setBlocked] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const slides = props.slidesComponents.map((slide, i) => ({
    Slide: slide,
    id: i,
  }));
  const inactive = id.current !== activeSlideShows[activeSlideShows.length - 1];

  useEffect(() => {
    setActiveSlideShows([...activeSlideShows, id.current]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const abort = new AbortController();

    document.addEventListener(
      "keydown",
      (e) => {
        if (inactive) return;
        const slide = (doSlide: () => void) => {
          e.preventDefault();
          if (blocked) return;
          doSlide();
          setBlocked(true);
        };

        const leaveSlideShow = () => {
          e.preventDefault();
          if (activeSlideShows.length === 1) return;
          setActiveSlideShows(activeSlideShows.filter((s) => s !== id.current));
        };

        if (e.key === "ArrowLeft") {
          if (props.index === 0) return leaveSlideShow();

          slide(() => {
            setDirection("left");
            props.setIndex(props.index - 1);
          });
        }
        if (e.key === "ArrowRight") {
          if (props.index === slides.length - 1) return leaveSlideShow();

          slide(() => {
            setDirection("right");
            props.setIndex(props.index + 1);
          });
        }
      },
      { signal: abort.signal },
    );

    return () => abort.abort();
  }, [
    inactive,
    activeSlideShows,
    blocked,
    props,
    setActiveSlideShows,
    slides.length,
  ]);

  return (
    <AnimatePresence custom={direction} mode="popLayout">
      <motion.div
        className="flex size-full items-center justify-center"
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
