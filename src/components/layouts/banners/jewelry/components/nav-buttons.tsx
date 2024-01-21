import { ArrowNextTwoIcon, ArrowPrevTwoIcon } from '@/components/icons';
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
      className="absolute bottom-14 right-1/2 flex translate-x-1/2 gap-8  text-white sm:bottom-24 md:right-40"
    >
      <button
        className="flex h-14 w-14 items-center justify-center rounded-full ring-white transition-all duration-300 ease-in-out hover:ring-2"
        aria-label="slider prev button"
        onClick={() => slider?.slickPrev()}
      >
        <ArrowPrevTwoIcon />
      </button>
      <button
        aria-label="slider next button"
        className="flex h-14 w-14 items-center justify-center rounded-full ring-white transition-all duration-300 ease-in-out hover:ring-2"
        onClick={() => slider?.slickNext()}
      >
        <ArrowNextTwoIcon />
      </button>
    </motion.div>
  );
}
