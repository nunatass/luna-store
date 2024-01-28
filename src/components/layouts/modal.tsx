'use client';

import { useModal } from '@/hooks/use-modal';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import Overlay from './overlay';

type ContainerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  className?: string;
};

const Container = ({
  isOpen,
  setIsOpen,
  children,
  className,
}: ContainerProps) => {
  const sidebarPanelAnimation = {
    initial: { scale: '50%', x: '-50%', y: '-50%' },
    animate: { scale: '100%', x: '-50%', y: '-50%' },
    exit: { scale: '0%', x: '-50%', y: '-50%' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="z-[9999]">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className={cn(
              'scrollbar-hide scrollbar-hide fixed left-1/2  top-1/2 z-[9999] h-max w-max overflow-scroll rounded-sm bg-white p-8 shadow-sm',
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

export const Modal = () => {
  const { isOpen, setIsOpen, children } = useModal();
  return (
    <Container isOpen={isOpen} setIsOpen={setIsOpen}>
      {children}
    </Container>
  );
};
