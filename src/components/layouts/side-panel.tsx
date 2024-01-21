import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import Overlay from './overlay';

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
  const sidebarPanelAnimation = {
    initial: { x: '100%' },
    animate: { x: '0' },
    exit: { x: '100%' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="z-[9999]">
      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <motion.div
            className={cn(
              'scrollbar-hide scrollbar-hide fixed right-0  top-0 z-[9999] h-full min-h-screen w-full max-w-[400px] overflow-scroll bg-white shadow-sm',
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
