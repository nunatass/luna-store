'use client';

import { Button } from '@/components/ui/button';
import { useSticky } from '@/hooks/use-sticky';
import { AnimatePresence, motion } from 'framer-motion';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const animateButton = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
  transition: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] },
};

export const JewelryBanner = () => {
  const { sticky } = useSticky();

  return (
    <div className=" relative h-screen w-screen overflow-hidden">
      <section className="relative h-full w-full bg-[#AB9774] bg-[url('/banner.jpeg')] bg-center bg-no-repeat">
        <div className="button absolute left-1/2 top-1/2 z-10 -mt-16 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 text-white">
          <div className="hidden md:block">
            <div className="text-2xl font-bold md:text-5xl">
              BE YOU, WEARING US.
            </div>
          </div>
        </div>

        <div className="absolute bottom-40 left-1/2 z-30 -translate-x-1/2 sm:bottom-16 md:left-20 md:translate-x-0">
          <AnimatePresence>
            {!sticky && (
              <motion.div {...animateButton}>
                <Button
                  className="w-36 bg-white text-sm text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white md:w-56"
                  asChild
                >
                  <AnchorLink href="#products">SHOP NOW</AnchorLink>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
