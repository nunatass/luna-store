'use client';
import { Variant } from '@/common/types';
import { useCurrency } from '@/hooks/use-currency';
import { formatPrice, stringToId } from '@/lib/utils';
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
};
const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const CartProductCell = ({
  media,
  title,
  price,
  discount,
  variant,
  orderQuantity,
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
        {discount > 0 && (
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
      </div>
    </div>
  );
};
