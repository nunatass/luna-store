'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import Overlay from './overlay';

const sidebarPanelAnimation = {
  initial: { x: '100%' },
  animate: { x: '0' },
  exit: { x: '100%' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

type SidePanelProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  className?: string;
};

export const SidePanel = ({
  isOpen,
  setIsOpen,
  children,
  className,
}: SidePanelProps) => {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [isOpen]);

  return (
    <div className="z-[9999]">
      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <motion.div
            className={cn(
              'scrollbar-hide scrollbar-hide fixed right-0 top-0 z-[9999999] h-full min-h-screen w-full max-w-[400px] overflow-scroll overscroll-none	bg-white	shadow-sm	',
              className
            )}
            {...sidebarPanelAnimation}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <Overlay isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
