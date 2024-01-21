import { ArrowRightLongIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
type BannerItemProps = {
  className?: string;
  contentType: string;
  backgroundColor: string;
  image: StaticImageData;
  title: string;
  isClicable?: boolean;
};

export const BannerItem = ({
  className,
  backgroundColor,
  image,
  contentType,
  title,
  isClicable = false,
}: BannerItemProps) => {
  return (
    <div
      className={cn(
        'relative flex h-64 w-full justify-between overflow-hidden px-8 py-8',
        className
      )}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className="absolute left-0 top-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-300 ease-in-out hover:scale-105 sm:bg-contain sm:bg-right"
        style={{ backgroundImage: `url(${image.src})` }}
      />
      <div className="gpa-2 z-10 flex flex-col ">
        <span className="text-base">{contentType}</span>
        <h3 className="text-3xl">
          <Link href="/shop" aria-label="shop link">
            {title}
          </Link>
        </h3>
        {isClicable && (
          <div className="mt-8 flex w-max items-center justify-center px-6 py-1.5 text-black ring-2 ring-gray-200 transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:ring-black">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2"
              aria-label="shop link"
            >
              Shop Now <ArrowRightLongIcon />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
