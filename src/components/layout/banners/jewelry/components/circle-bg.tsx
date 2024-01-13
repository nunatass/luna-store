import { motion } from 'framer-motion';

const circlesAnimationVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
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
      <motion.span
        {...getCirclesAnimationProps(index, currentSlide)}
        key={`${index} dot-full`}
        className="absolute -bottom-[24%] md:-bottom-[35%] left-[8%] lg:left-[35%] h-[500px] w-[500px] rounded-full bg-[#ae9b79] sm:h-[800px] sm:w-[800px] scale-0"
      />
      <motion.span
        {...getCirclesAnimationProps(index, currentSlide)}
        key={`${index} dot-border`}
        className="absolute -bottom-[25%] md:-bottom-[40%] left-[10%] lg:left-[33%] h-[500px] w-[500px] rounded-full border-2 border-[#b7a687] sm:h-[800px] sm:w-[800px] scale-0"
      />
    </>
  );
}
