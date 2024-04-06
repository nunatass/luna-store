'use client';
import { Variant } from '@/common/types';
import { useCurrency } from '@/hooks/use-currency';
import { formatPrice, stringToId } from '@/lib/utils';
import { GiftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CartProductCellProps = {
  media: string;
  title: string;
  id?: string;
  price: number;
  discount: number;
  orderQuantity: number;
  variant?: Variant;
  giftAmount?: number;
};
const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const CartProductCell = ({
  media,
  title,
  price,
  discount,
  variant,
  orderQuantity,
  giftAmount,
}: CartProductCellProps) => {
  const { symbol } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <Link href={`/products/${stringToId(title)}`} aria-label="product item">
        <div className="relative h-24 w-20 bg-gray-200">
          <Image
            src={`${imageUrlPrefix}/${media}`}
            alt="product img"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Link>
      <div className="ml-2 flex flex-col gap-2">
        <Link
          href={`/products/${stringToId(title)}`}
          aria-label={title}
          className=" text-left text-base"
        >
          {title}
        </Link>
        {discount > 0 && giftAmount === 0 && (
          <div className="flex items-center gap-2 ">
            <span className="line-through">
              {symbol}
              {formatPrice(price * orderQuantity)}
            </span>

            <span className="bg-black p-1 text-sm text-white">
              {discount}% OFF
            </span>
          </div>
        )}
        <span className="-mt-2 text-[12px] text-gray-700">
          {variant?.label}
        </span>
        {giftAmount! > 0 && (
          <>
            <span className="line-through">
              {symbol}
              {formatPrice(price * orderQuantity)}
            </span>
            <span className="flex h-5 w-20 items-center justify-center gap-2 rounded bg-[#669e5cee] px-1 py-0.5 text-sm text-white">
              {giftAmount} GIFT
              <GiftIcon className="h-4 w-4" />
            </span>
          </>
        )}
      </div>
    </div>
  );
};
