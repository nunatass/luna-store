'use client';
import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useState } from 'react';

type BackToTopButtonProps = {
  className?: string;
};

const animateButton = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
  whileHover: {
    y: -5,
  },
  transition: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] },
};

export const BackToTopButton = ({ className }: BackToTopButtonProps) => {
  const viewportHeight = window?.innerHeight;
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowBackToTopButton(latest > viewportHeight - 200);
  });

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <AnimatePresence mode="wait" initial>
        {showBackToTopButton && (
          <motion.button
            type="button"
            aria-label="back to top button"
            className={cn(
              'w-11 h-11 fixed bottom-10 right-10 bg-black rounded-full text-white flex items-center justify-center drop-shadow-lg',
              className
            )}
            onClick={handleClick}
            {...animateButton}
          >
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 6L6 1L1 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
