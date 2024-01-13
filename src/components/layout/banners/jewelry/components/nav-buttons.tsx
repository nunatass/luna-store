import { ArrowNextTwo, ArrowPrevTwo } from '@/components/icons';
import { motion } from 'framer-motion';
import Slider from 'react-slick';

type NavButtonsProps = {
  slider: Slider | undefined;
};

export function NavButtons({ slider }: NavButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      className="absolute right-1/2 translate-x-1/2 md:right-40 bottom-10  text-white gap-8 flex"
    >
      <button
        className="h-14 w-14 hover:ring-2 ring-white ease-in-out duration-300 transition-all rounded-full flex justify-center items-center"
        onClick={() => slider?.slickPrev()}
      >
        <ArrowPrevTwo />
      </button>
      <button
        className="h-14 w-14 hover:ring-2 ring-white ease-in-out duration-300 transition-all rounded-full flex justify-center items-center"
        onClick={() => slider?.slickNext()}
      >
        <ArrowNextTwo />
      </button>
    </motion.div>
  );
}
