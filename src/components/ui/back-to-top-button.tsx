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
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!window) return;
    const viewportHeight = window?.innerHeight ?? 1000;
    setShowBackToTopButton(latest > viewportHeight - 200);
  });

  function handleClick() {
    window && window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="z-[80]">
      <AnimatePresence mode="wait" initial>
        {showBackToTopButton && (
          <motion.button
            type="button"
            aria-label="back to top button"
            className={cn(
              'fixed bottom-20 right-10 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white drop-shadow-lg',
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
    </div>
  );
};
