import { AnimatePresence, motion } from 'framer-motion';

type OverlayProps = {
  isOpen: boolean;
  setIsOpen: (isOpened: boolean) => void;
};

const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: '50%' },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export default function Overlay({ isOpen, setIsOpen }: OverlayProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {isOpen && (
        <motion.div
          onClick={() => setIsOpen(false)}
          {...overlayAnimation}
          className={`h-screen w-full bg-black fixed  top-0 right-0 opacity-50 z-[999] cursor-close`}
        />
      )}
    </AnimatePresence>
  );
}
