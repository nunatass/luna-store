import { motion } from 'framer-motion';

const circlesAnimationVariants = {
  hidden: { opacity: 0, scale: 0, x: '-30%' },
  visible: { opacity: 1, scale: 1, x: '-30%' },
};

const getCirclesAnimationProps = (index: number, currentSlide: number) => {
  return {
    variants: circlesAnimationVariants,
    initial: 'hidden',
    animate: index === currentSlide ? 'visible' : 'hidden',
    exit: 'hidden',
    transition: {
      duration: 1,
      ease: [0.83, 0, 0.17, 1],
      delay: 0.6,
    },
  };
};

type CircleBGProps = {
  index: number;
  currentSlide: number;
};

export function CircleBG({ index, currentSlide }: CircleBGProps) {
  return (
    <>
      <motion.div
        {...getCirclesAnimationProps(index, currentSlide)}
        key={`${index} dot-full`}
        className="absolute -bottom-[20%] left-1/2 h-[500px] w-[500px] scale-0 rounded-full bg-[#ae9b79] sm:h-[800px] sm:w-[800px]"
      />
      <motion.div
        {...getCirclesAnimationProps(index, currentSlide)}
        key={`${index} dot-border`}
        className="absolute -bottom-[25%] left-[48%] h-[500px] w-[500px] scale-0 rounded-full border-2 border-[#b7a687] sm:h-[800px] sm:w-[800px]"
      />
    </>
  );
}
