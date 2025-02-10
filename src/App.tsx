import { useState } from "react";

import { motion } from "motion/react";

import { Cursor } from "./components/Cursor";
import { AnimatePresenceSlide } from "./components/slides/AnimatePresenceSlide";
import { ApiSlide } from "./components/slides/ApiSlide";
import { EasingsSlide } from "./components/slides/EasingsSlide";
import { IntroSlide } from "./components/slides/IntroSlide";
import { InViewSlide } from "./components/slides/InViewSlide";
import { LayoutSlide } from "./components/slides/LayoutSlide";
import { StartSlide } from "./components/slides/StartSlide";
import { WhatSlide } from "./components/slides/WhatSlide";
import { SlideShow } from "./components/SlideShow";

// Makes hard things easy, and easy things great.
function App() {
  const slides = [
    <InViewSlide />,
    <StartSlide />,
    <IntroSlide />,
    <WhatSlide />,
    <EasingsSlide />,
    <ApiSlide />,
    <AnimatePresenceSlide />,
    <LayoutSlide />,
  ];

  const [index, setIndex] = useState(0);

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
