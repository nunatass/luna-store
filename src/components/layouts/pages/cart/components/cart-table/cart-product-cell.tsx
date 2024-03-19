import { Variant } from '@/common/types';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type CartProductCellProps = {
  media: string;
  title: string;
  id: string;
  price: number;
  discount: number;
  orderQuantity: number;
  variant?: Variant;
};
const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const CartProductCell = ({
  id,
  media,
  title,
  price,
  discount,
  variant,
  orderQuantity,
}: CartProductCellProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/product/${id}`} aria-label="product item">
        <div className="bg-gray-200">
          <Image
            src={`${imageUrlPrefix}/${media}`}
            alt="product img"
            width={70}
            height={110}
            priority
          />
        </div>
      </Link>
      <div className="ml-2 flex flex-col gap-2">
        <Link
          href={`/products/${id}`}
          aria-label={title}
          className=" text-left text-base"
        >
          {title}
        </Link>
        {discount > 0 && (
          <div className="flex items-center gap-2 ">
            <span className="line-through">
              ${formatPrice(price * orderQuantity)}
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
