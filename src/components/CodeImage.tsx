import { motion } from 'motion/react';
import { cn } from '../utils';
import { useState } from 'react';

// https://www.ray.so/#width=520&padding=16&background=false&theme=candy
export const CodeImage = (props: { src: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='grid [&>img]:[grid-area:1/1]'>
      {/* Image clone to prevent layout shift on open */}
      <img
        src={props.src}
        alt='code image'
        aria-hidden
        className='opacity-0 pointer-events-none'
      />

      <motion.div
        animate={{
          opacity: open ? 1 : 0,
        }}
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 w-full h-full backdrop-blur-lg',
          open ? 'pointer-events-all' : 'pointer-events-none'
        )}
      />

      <motion.img
        layout
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{
          scale: 0.98,
        }}
        className={cn(
          'select-none',
          open &&
            ' fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl '
        )}
        draggable={false}
        src={props.src}
        alt='code image'
      />
    </div>
  );
};
