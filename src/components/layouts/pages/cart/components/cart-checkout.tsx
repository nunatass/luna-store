'use client';

import { useCart } from '@/hooks/use-cart';
import { useCurrency } from '@/hooks/use-currency';
import { formatPrice } from '@/lib/utils';
import { CartShippingPriceForm } from './cart-shipping-price-form';

export const CartCheckout = () => {
  const { getTotal } = useCart();
  const { symbol } = useCurrency();
  const { totalWithDiscount } = getTotal();
  return (
    <div className="flex h-max w-full min-w-80 flex-col gap-4 divide-y-[1px] bg-white p-6 shadow-sm lg:max-w-80">
      <div className="flex h-max items-center justify-between text-xl font-medium">
        <span className="">Subtotal</span>
        <span className="">
          {symbol}
          {formatPrice(totalWithDiscount)}
        </span>
      </div>
      <CartShippingPriceForm />
    </div>
  );
};
