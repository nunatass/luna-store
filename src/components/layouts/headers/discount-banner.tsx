'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const DiscountBanner = () => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        'left-0 top-0  inline-flex w-full flex-nowrap justify-end overflow-hidden bg-black py-2 text-sm text-white [mask-image:_linear-gradient(to_right,transparent_100,_black_128px,_black_calc(100%-200px),transparent_100%)]',
        pathname === '/' && 'bg-white text-black'
      )}
    >
      <ul
        className="flex w-full animate-infinite-scroll items-center justify-between [&_li]:mx-8 "
        aria-hidden="true"
      >
        <li />
        <li className="shink-0 whitespace-nowrap">
          Free stander delivery on purchases of +$99
        </li>
      </ul>
    </div>
  );
};
