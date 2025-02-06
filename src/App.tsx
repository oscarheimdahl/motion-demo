import { useState } from "react";

import { motion } from "motion/react";

import { Cursor } from "./components/Cursor";
import { Slide0 } from "./components/slides/Slide0";
import { Slide1 } from "./components/slides/Slide1";
import { Slide2 } from "./components/slides/Slide2";
import { Slide3 } from "./components/slides/Slide3";
import { Slide4 } from "./components/slides/Slide4";
import { Slide5 } from "./components/slides/Slide5";
import { SlideShow } from "./components/SlideShow";

// Makes hard things easy, and easy things great.
function App() {
  const slides = [
    <Slide0 />,
    <Slide1 />,
    <Slide2 />,
    <Slide3 />,
    <Slide4 />,
    <Slide5 />,
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
