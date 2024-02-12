import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type CartProductCellProps = {
  media: string;
  title: string;
  id: string;
  price: number;
  discount: number;
};
const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const CartProductCell = ({
  id,
  media,
  title,
  price,
  discount,
}: CartProductCellProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/product/${id}`}>
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
        <Link href={`/products/${id}`} className=" text-center text-base">
          {title}
        </Link>
        <div className="flex items-center gap-2 ">
          <span className="line-through">${formatPrice(price)}</span>
          <span className="bg-black p-1 text-sm text-white">-{discount}%</span>
        </div>
      </div>
    </div>
  );
};
