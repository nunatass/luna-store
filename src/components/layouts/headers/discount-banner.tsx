'use client';

import { DeliveryIcon, DiscountIcon } from '@/components/icons';

import { useCurrency } from '@/hooks/use-currency';
import Slider from 'react-infinite-logo-slider';

const freeShippingThreshold =
  Number(process.env.NEXT_PUBLIC_SHIPPING_THRESHOLD) || 6000;

export const DiscountBanner = () => {
  const { symbol } = useCurrency();
  return (
    <Slider
      width="450px"
      duration={15}
      pauseOnHover={false}
      blurBorders={false}
      className="h-20 border-0"
    >
      <Slider.Slide className=" flex h-10 items-center justify-center gap-2 border-2 border-[#ffcbcf] bg-[#ffcbcf] text-black">
        <DeliveryIcon className="w-8 w-8 text-white" />
        {`Free Shipping over ${symbol}${freeShippingThreshold / 100}`}
      </Slider.Slide>
      <Slider.Slide className="flex  h-10 items-center justify-center gap-2 border-2 border-[#ffcbcf] bg-[#ffcbcf] text-black">
        <DiscountIcon className="w-6 w-6" />
        {`Mother’s Day - BUY 2, GET 1 FREE`}
      </Slider.Slide>
    </Slider>
  );
};
