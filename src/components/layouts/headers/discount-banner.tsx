import { cn } from '@/lib/utils';
const freeShippingThreshold =
  Number(process.env.NEXT_PUBLIC_SHIPPING_THRESHOLD) || 6000;

export const DiscountBanner = () => {
  return (
    <div
      className={cn(
        'inline-flex w-full flex-nowrap justify-end overflow-hidden bg-black py-2 text-sm text-white [mask-image:_linear-gradient(to_right,transparent_100,_black_128px,_black_calc(100%-200px),transparent_100%)]'
        // pathname === '/' && 'bg-white text-black'
      )}
    >
      <ul
        className="flex w-full animate-infinite-scroll items-center justify-between [&_li]:mx-8 "
        aria-hidden="true"
      >
        <li />
        <li className="shrink-0 whitespace-nowrap">
          {`Free stander delivery on purchases of +$${freeShippingThreshold / 100}`}
        </li>
      </ul>
    </div>
  );
};
