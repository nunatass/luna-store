'use client';

import { useCurrency } from '@/hooks/use-currency';
import { formatPriceWithDiscount } from '@/lib/utils';

type CartPriceCellProps = {
  price: number;
  orderQuantity: number;
  discount: number;
};

export default function CartPriceCell({
  price,
  orderQuantity,
  discount,
}: CartPriceCellProps) {
  const { symbol } = useCurrency();
  return (
    <p>
      {symbol}
      {formatPriceWithDiscount(price * orderQuantity, discount).price}
    </p>
  );
}
