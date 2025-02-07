import { useEffect, useState } from "react";

import { motion } from "motion/react";

import { cn } from "../utils";

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [click, setClick] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const abort = new AbortController();

    document.addEventListener("mousedown", () => setClick(true), {
      signal: abort.signal,
    });
    document.addEventListener("mouseup", () => setClick(false), {
      signal: abort.signal,
    });
    return () => {
      abort.abort();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{
        zIndex: 9999,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <motion.div
        transition={{
          duration: 0.075,
        }}
        animate={{
          width: click ? "4px" : "8px",
          height: click ? "4px" : "8px",
        }}
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 rounded-full bg-none ring backdrop-invert",
        )}
      />
    </div>
  );
};
