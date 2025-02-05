import { motion } from 'motion/react';
import { ShadowText } from '../ShadowText';

import jsSrc from '../../images/js.png';
import npmSrc from '../../images/npm.png';
import reactSrc from '../../images/react.png';

export const Slide2 = () => {
  const imgVariant = {
    show: {
      opacity: 1,
      translateY: 0,
    },
    initial: {
      opacity: 0,
      translateY: 200,
    },
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center '>
      <motion.div
        transition={{ type: 'spring', bounce: 1, damping: 2 }}
        drag
        dragSnapToOrigin
        dragTransition={{ bounceDamping: 10 }}
      >
        <ShadowText className='text-7xl font-black drop-shadow-hard-xl'>
          Va äre?
        </ShadowText>
      </motion.div>
      <motion.div
        variants={{}}
        transition={{ staggerChildren: 0.2, delayChildren: 1 }}
        initial={'initial'}
        animate={'show'}
        className='absolute py-12 overflow-hidden bottom-0 flex justify-around items-center w-full'
      >
        <motion.img
          variants={imgVariant}
          className='w-42 select-none'
          src={npmSrc}
          alt='npm logo'
        />
        <motion.img
          variants={{
            show: {
              opacity: 1,
              translateY: 0,
            },
            initial: {
              opacity: 0,
              translateY: 200,
            },
          }}
          style={{ animationDelay: '4000ms', animationDuration: '4000ms' }}
          className='w-36 select-none animate-spin'
          src={reactSrc}
          alt='react logo'
        />
        <motion.img
          variants={imgVariant}
          className='w-32 select-none'
          src={jsSrc}
          alt='js logo'
        />
      </motion.div>
    </div>
  );
};
