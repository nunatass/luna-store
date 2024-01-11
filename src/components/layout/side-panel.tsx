// internal
// import MobileCategory from '@/layout/headers/header-com/mobile-category';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import Overlay from './overlay';

//import MobileMenus from './mobile-menus';

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
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <motion.div
            className={cn(
              'min-h-screen h-full overflow-scroll max-w-96 w-full bg-white z-50 fixed top-0 right-0 shadow-sm scrollbar-hide',
              className
            )}
            {...sidebarPanelAnimation}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <Overlay isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
