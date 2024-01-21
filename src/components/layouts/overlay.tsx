import { AnimatePresence, motion } from 'framer-motion';

type OverlayProps = {
  isOpen: boolean;
  setIsOpen: (isOpened: boolean) => void;
};

const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: '70%' },
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
          className={`fixed right-0 top-0 z-[999]  h-screen w-full cursor-close bg-black opacity-70`}
        />
      )}
    </AnimatePresence>
  );
}
