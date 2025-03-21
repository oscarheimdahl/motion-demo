import { useEffect, useState } from "react";

import { motion } from "motion/react";

import { Cursor } from "./components/Cursor";
import { AnimatePresenceSlide } from "./components/slides/AnimatePresenceSlide";
import { ApiSlide } from "./components/slides/ApiSlide";
import { EasingsSlide } from "./components/slides/EasingsSlide";
import { EndSlide, QuoteSlide } from "./components/slides/EndSlide";
import { IntroSlide } from "./components/slides/IntroSlide";
import { LayoutSlide } from "./components/slides/LayoutSlide";
import { ScrollingSlide } from "./components/slides/ScrollingSlide";
import { SpringSlide } from "./components/slides/SpringSlide";
import { StartSlide } from "./components/slides/StartSlide";
import { WhatSlide } from "./components/slides/WhatSlide";
import { SlideShow } from "./components/SlideShow";

const getIndexFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("i")) || 0;
};

// Makes hard things easy, and easy things great.
function App() {
  const [index, setIndex] = useState(getIndexFromURL());
  const slides = [
    <StartSlide />,
    <IntroSlide />,
    <WhatSlide />,
    <EasingsSlide />,
    <SpringSlide />,
    <ApiSlide />,
    <AnimatePresenceSlide />,
    <LayoutSlide />,
    <ScrollingSlide />,
    <QuoteSlide />,
    <EndSlide />,
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("i", index.toString());
    window.history.replaceState({}, "", `?${params.toString()}`);
  }, [index]);

  return (
    <>
      <div className="h-full w-full overflow-hidden">
        <div className="bg-blue flex h-full w-full items-center justify-center">
          <SlideShow
            index={index}
            setIndex={setIndex}
            slidesComponents={slides}
          />
        </div>
      </div>
      <motion.div
        className="fixed bottom-0 left-0 h-2 rounded-r-full bg-red-400"
        animate={{ width: `${(100 * index) / (slides.length - 1)}%` }}
      ></motion.div>
      <Cursor />
    </>
  );
}

export default App;
