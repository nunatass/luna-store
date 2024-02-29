import bannerMB from '@/assets/img/home/banner-mb.jpg';
import banner from '@/assets/img/home/banner.jpeg';

import Image from 'next/image';

import { cn } from '@/lib/utils';

export const JewelryBanner = () => {
  return (
    <section
      className={cn('relative h-screen w-screen overflow-hidden bg-[#AB9774]')}
    >
      <Image
        fill
        src={banner}
        alt="banner image"
        className="hidden object-cover md:block"
        priority
      />
      <Image
        fill
        src={bannerMB}
        alt="banner image"
        className="block object-cover md:hidden"
        priority
      />
      <div className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-white/80">
        <span className="text-3xl md:text-5xl">Spring Collections</span>
        <span className="text-lg">25% OFF</span>
      </div>
    </section>
  );
};
