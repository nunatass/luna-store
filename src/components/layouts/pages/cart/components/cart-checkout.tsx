'use client';
import { useCart } from '@/hooks/use-cart';
import { CartShippingPriceForm } from './cart-shipping-price-form';

export const CartCheckout = () => {
  const { getTotal } = useCart();
  const total = getTotal().total;
  return (
    <div className="mt-4 flex h-96 w-full min-w-80 flex-col gap-4 divide-y-[1px] bg-white p-6 shadow-sm lg:max-w-80">
      <div className="flex h-max items-center justify-between text-xl font-medium">
        <span className="">Subtotal</span>
        <span className="">${total}</span>
      </div>
      <CartShippingPriceForm />
    </div>
  );
};
