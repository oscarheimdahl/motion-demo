import { ArrowBigRight } from "lucide-react";
import { motion } from "motion/react";

export const StartSlide = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="flex items-center text-6xl font-black text-[#1D5EB0]"
      >
        Start
        <ArrowBigRight className="inline-block size-16 fill-[#1D5EB0] stroke-transparent" />
      </motion.div>
    </div>
  );
};
