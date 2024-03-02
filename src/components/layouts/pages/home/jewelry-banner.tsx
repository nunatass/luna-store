'use client';
import banner2 from '@/assets/img/home/banner-2.png';
import banner3 from '@/assets/img/home/banner-3.png';
import banner from '@/assets/img/home/banner.jpeg';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useCallback, useState } from 'react';
const animationVariants = {
  initial: { scale: 1.2, opacity: 0.45 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 1.2, opacity: 0.45 },
};
export const JewelryBanner = () => {
  const [currentBanner, setCurrentBanner] = useState({
    key: 'banner 1',
    banner: banner,
  });

  const handleChangeBanner = useCallback(
    (key: string, banner: StaticImageData) => {
      setCurrentBanner({
        key,
        banner,
      });
    },
    [setCurrentBanner]
  );
  return (
    <div className=" relative h-screen w-screen overflow-hidden bg-[#AB9774]">
      <motion.section
        {...animationVariants}
        key={currentBanner.key}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className={cn('relative h-full w-full ')}
      >
        <Image
          fill
          src={currentBanner.banner}
          alt="banner image"
          className="object-cover"
          priority
          unoptimized
        />
        {/* <Image
        fill
        src={bannerMB}
        alt="banner image"
        className="block object-cover md:hidden"
        priority
      /> */}
        <div className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-white/80">
          <span className="text-3xl md:text-5xl">Spring Collections</span>
          <span className="text-lg">25% OFF</span>
        </div>
      </motion.section>
      <div className="absolute bottom-20 left-8 z-10 flex h-4 w-20  gap-4 md:right-8">
        <span
          className={cn(
            'h-2.5 w-2.5 cursor-pointer rounded-full bg-transparent ring-2 ring-white',
            currentBanner.key === 'banner 1' && 'bg-white'
          )}
          onClick={() => handleChangeBanner('banner 1', banner)}
        />

        <span
          className={cn(
            'h-2.5 w-2.5 cursor-pointer rounded-full bg-transparent ring-2 ring-white',
            currentBanner.key === 'banner 2' && 'bg-white'
          )}
          onClick={() => handleChangeBanner('banner 2', banner2)}
        />

        <span
          className={cn(
            'h-2.5 w-2.5 cursor-pointer rounded-full bg-transparent ring-2 ring-white',
            currentBanner.key === 'banner 3' && 'bg-white'
          )}
          onClick={() => handleChangeBanner('banner 3', banner3)}
        />
      </div>
    </div>
  );
};
