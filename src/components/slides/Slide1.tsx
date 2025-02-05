import { motion } from 'motion/react';
import { ShadowText } from '../ShadowText';

export const Slide1 = () => {
  return (
    <div className='h-screen w-screen justify-center items-center flex gap-36 '>
      <div className='flex flex-col gap-1'>
        <motion.div
          initial={'hidden'}
          animate={'visible'}
          variants={{
            hidden: {
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                when: 'beforeChildren',
              },
            },
          }}
        >
          <motion.div
            className='-mb-2 relative w-fit translate-x-1'
            transition={{
              duration: 1,
            }}
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 0.6,
              },
            }}
          >
            <ShadowText className='w-fit mix-blend-plus-darker text-5xl font-black drop-shadow-hard-lg'>
              Framer
            </ShadowText>
          </motion.div>
          {'Motion'.split('').map((char, i) => {
            return (
              <motion.div
                className='inline-block'
                variants={{
                  hidden: {
                    opacity: 0,
                    translateY: 100,
                    rotate: 90,
                  },
                  visible: {
                    opacity: 1,
                    translateY: 0,
                    rotate: 0,
                  },
                }}
                key={i}
              >
                <ShadowText className='text-9xl font-black drop-shadow-hard-xl'>
                  {char}
                </ShadowText>
              </motion.div>
            );
          })}
          <motion.div
            className='flex'
            transition={{
              duration: 0.8,
              delay: 1,
              type: 'spring',
              bounce: 0.5,
            }}
            variants={{
              hidden: {
                opacity: 0,
                scale: 0,
              },
              visible: {
                opacity: 1,
                scale: 1,
              },
            }}
          >
            <ShadowText className='ml-auto'>the Animation Library</ShadowText>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
