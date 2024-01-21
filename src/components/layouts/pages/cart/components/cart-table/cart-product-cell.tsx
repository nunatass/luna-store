import Image from 'next/image';
import Link from 'next/link';

type CartProductCellProps = {
  img: string;
  title: string;
  id: string;
};

export const CartProductCell = ({ id, img, title }: CartProductCellProps) => {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/product-details/${id}`}>
        <div className="bg-gray-200">
          <Image src={img} alt="product img" width={70} height={110} />
        </div>
      </Link>
      <Link
        href={`/product-details/${id}`}
        className="ml-2 text-center text-base"
      >
        {title}
      </Link>
    </div>
  );
};
