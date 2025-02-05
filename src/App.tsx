import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { CodeImage } from './components/CodeImage';
import { Cursor } from './components/Cursor';
import { Slide1 } from './components/slides/Slide1';
import { Slide2 } from './components/slides/Slide2';
import { Slide3 } from './components/slides/Slide3';
import { Slide4 } from './components/slides/Slide4';
import codeTest from './images/image.png';

function App() {
  const slides = [
    { Slide: <div className="size-full" />, id: 0 },
    { Slide: <Slide1 />, id: 1 },
    // Makes hard things easy, and easy things great.
    { Slide: <Slide2 />, id: 2 },
    { Slide: <Slide3 />, id: 3 },
    { Slide: <Slide4 />, id: 4 },
    {
      Slide: (
        <div className="flex flex-row">
          <div className="flex flex-col w-full h-full">
            <CodeImage src={codeTest} />
            <CodeImage src={codeTest} />
          </div>
          <div className="flex flex-col w-full h-full">
            <CodeImage src={codeTest} />
            <CodeImage src={codeTest} />
          </div>
        </div>
      ),
      id: 4,
    },
  ];

  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [index, setIndex] = useState(0);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const abort = new AbortController();
    document.addEventListener(
      'keydown',
      (e) => {
        if (blocked) return;
        if (e.key === 'ArrowLeft') {
          if (index === 0) return;
          setDirection('left');
          setIndex(index - 1);
          setBlocked(true);
        }
        if (e.key === 'ArrowRight') {
          if (index === slides.length - 1) return;
          setDirection('right');
          setIndex(index + 1);
          setBlocked(true);
        }
      },
      {
        signal: abort.signal,
      },
    );

    return () => {
      abort.abort();
    };
  }, [blocked, index, slides.length]);

  return (
    <>
      <div className="h-full w-full overflow-hidden">
        <div className="h-full w-full flex bg-blue justify-center items-center">
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <motion.div
              onAnimationComplete={() => setBlocked(false)}
              custom={direction}
              initial={'initial'}
              animate={'target'}
              exit={'exit'}
              variants={{
                initial: (direction) => ({
                  translateX: direction === 'left' ? '-60rem' : '60rem',
                  rotate: direction === 'left' ? '20deg' : '-20deg',
                  opacity: 0,
                }),
                target: {
                  translateX: 0,
                  rotate: 0,
                  opacity: 1,
                },
                exit: (direction) => ({
                  translateX: direction === 'left' ? '60rem' : '-60rem',
                  rotate: direction === 'left' ? '-20deg' : '20deg',
                  opacity: 0,
                }),
              }}
              key={slides[index].id}
            >
              {slides[index].Slide}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <motion.div
        className="fixed left-0 bottom-0 h-2 bg-red-400 rounded-r-full"
        animate={{ width: `${(100 * index) / (slides.length - 1)}%` }}
      ></motion.div>
      <Cursor />
    </>
  );
}

export default App;
