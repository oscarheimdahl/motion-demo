import { useEffect, useState } from "react";

import { motion, Reorder } from "motion/react";

import layout from "../../images/code/layout.png";
import { cn, swapRandomElementsInArray } from "../../utils";
import { CodeImage } from "../CodeImage";
import { ShadowTextHeader } from "../ShadowText";
import { SlideShow } from "../SlideShow";

export const LayoutSlide = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <motion.div
        className="absolute"
        initial={"initial"}
        animate={"animate"}
        variants={{
          initial: {},
          animate: {
            filter: "blur(0px)",
            scale: 1,
            transition: {
              delay: 1,
              duration: 0.2,
              mass: 1.5,
              type: "spring",
              damping: 50,
              stiffness: 800,
            },
          },
        }}
      >
        <motion.div
          variants={{
            animate: {
              scale: 0.8,
              translateY: "-40vh",
              transition: {
                delay: 2.5,
                duration: 0.2,
                mass: 1.5,
                type: "spring",
                damping: 50,
                stiffness: 800,
                delayChildren: 2,
              },
            },
          }}
          className="gap0 flex items-center"
        >
          <motion.div
            transition={{ delay: 1 }}
            initial={{ translateX: "100%" }}
            animate={{ translateX: 0 }}
          >
            <ShadowTextHeader>Lay</ShadowTextHeader>
          </motion.div>
          <motion.div
            transition={{ delay: 1 }}
            initial={{ translateX: "-100%" }}
            animate={{ translateX: 0 }}
          >
            <ShadowTextHeader>out</ShadowTextHeader>
          </motion.div>
          <motion.div
            transition={{ delay: 2.5 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            className="grid [&>div]:[grid-area:1/1]"
          >
            <motion.div
              className="ml-1"
              transition={{ delay: 1 }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0 }}
            >
              <ShadowTextHeader>?</ShadowTextHeader>
            </motion.div>
            <motion.div
              className="ml-1"
              transition={{ delay: 1 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1.2 }}
            >
              <ShadowTextHeader>!</ShadowTextHeader>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3.5 }}
      >
        <SlideShow
          index={index}
          setIndex={setIndex}
          slidesComponents={[<Layout />, <ReOrder />]}
        ></SlideShow>
      </motion.div>
    </div>
  );
};

const Layout = () => {
  const [cards, setCards] = useState(
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
    })),
  );
  const swap = () => setCards((prev) => [...swapRandomElementsInArray(prev)]);

  useEffect(() => {
    swap();
    const interval = setInterval(() => {
      swap();
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex gap-12">
      <motion.div onClick={swap} className="grid grid-cols-5 gap-3 select-none">
        {cards.map((card) => (
          <motion.div
            layout
            key={card.id}
            transition={{ duration: 1, type: "spring", mass: 0.3 }}
            className="drop-shadow-hard-sm striped-bg flex size-20 items-center justify-center rounded-md bg-teal-500 text-5xl"
          />
        ))}
      </motion.div>
      <div className="max-w-xl">
        <CodeImage src={layout} />
      </div>
    </div>
  );
};

export const ReOrder = () => {
  const [items, setItems] = useState(["Q", "A", "K", "10", "J"]);

  const sorted = items.every(
    (item, i) => item === ["A", "K", "Q", "J", "10"][i],
  );

  const [holding, setHolding] = useState(false);

  return (
    <Reorder.Group axis="x" values={items} onReorder={setItems}>
      <div
        onMouseDown={() => setHolding(true)}
        onMouseUp={() => setHolding(false)}
        className="flex flex-row gap-4"
      >
        {items.map((item, i) => (
          <Reorder.Item key={item} value={item}>
            <motion.div
              whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(0,0,0,.2)" }}
              animate={sorted && !holding ? "sorted" : "shuffled"}
              variants={{
                shuffled: {
                  rotate: i % 2 === 0 ? 1 : -1 * Math.random() * 10 - 5,
                },
                sorted: {
                  rotate: 0,
                },
              }}
              className={
                "bg-offwhite drop-shadow-hard-lg relative rounded-md px-14 py-24 text-neutral-900"
              }
            >
              <div className="absolute top-1 left-1 flex flex-col items-center text-3xl">
                <div>{item}</div>
                <div>♣</div>
              </div>
              <div
                className={cn(
                  "w-18 text-center text-7xl transition-all duration-700",
                  sorted && "text-amber-500",
                )}
              >
                {item}
              </div>

              <div className="absolute right-1 bottom-1 flex flex-col items-center text-3xl">
                <div>♣</div>
                <div className="rotate-180">{item}</div>
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </div>
    </Reorder.Group>
  );
};
