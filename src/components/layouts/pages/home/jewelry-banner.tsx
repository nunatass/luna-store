import banner from '@/assets/img/home/banner.jpeg';
import Image from 'next/image';

import { cn } from '@/lib/utils';

export const JewelryBanner = () => {
  return (
    <section
      className={cn(
        'relative h-[65vh] w-screen overflow-hidden bg-[#AB9774] md:h-[85vh]'
      )}
    >
      <Image
        fill
        src={banner}
        alt="banner image"
        className="object-cover object-center"
      />
    </section>
  );
};
