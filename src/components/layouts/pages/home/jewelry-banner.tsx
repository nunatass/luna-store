import banner from '@/assets/img/home/banner.jpg';
import Image from 'next/image';

import { cn } from '@/lib/utils';

export const JewelryBanner = () => {
  return (
    <section
      className={cn('relative h-screen w-screen overflow-hidden bg-[#AB9774]')}
    >
      <Image fill src={banner} alt="banner image" className="object-cover" />
    </section>
  );
};
