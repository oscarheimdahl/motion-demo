import { motion } from 'motion/react';
import { ShadowText } from '../ShadowText';
import { useEffect, useState } from 'react';

export const Slide3 = () => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='h-screen w-screen flex justify-center items-center '>
      <div className='flex w-full h-full items-center justify-around'>
        <div className='flex items-center flex-col'>
          <div
            className={
              ' dotted-bg transition-transform drop-shadow-hard-xl ease-in-out size-52  rounded-md bg-amber-500'
            }
            style={{
              transform: `translateY(${flip ? -100 : 100}px) rotate(${
                flip ? 0 : 90
              }deg)`,
              transitionDuration: '800ms',
              transitionTimingFunction: 'linear',
            }}
          />
          <ShadowText className='mt-36'>Linear</ShadowText>
        </div>
        <div className='flex items-center flex-col'>
          <div
            className={
              'dotted-bg transition-transform ease-in-out size-52 drop-shadow-hard-xl rounded-md bg-red-500'
            }
            style={{
              transform: `translateY(${flip ? -100 : 100}px) rotate(${
                flip ? 0 : 90
              }deg)`,
              transitionDuration: '800ms',
              transitionTimingFunction: 'ease-out',
            }}
          />
          <ShadowText className='mt-36'>Ease Out</ShadowText>
        </div>
        <div className='flex items-center flex-col'>
          <motion.div
            className='dotted-bg size-52 drop-shadow-hard-xl rounded-md bg-green-600'
            transition={{
              duration: 0.8,
              type: 'spring',
              mass: 1,
              velocity: 0.1,
            }}
            animate={{ translateY: flip ? -100 : 100, rotate: flip ? 0 : 90 }}
          ></motion.div>
          <ShadowText className='mt-36'>Motion ✨</ShadowText>
        </div>
      </div>
    </div>
  );
};
