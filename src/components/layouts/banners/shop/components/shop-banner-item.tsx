import { ArrowRightLong } from '@/components/icons';
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
        'py-8 px-8 flex justify-between w-full h-64 relative overflow-hidden',
        className
      )}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className="w-full h-full absolute bg-no-repeat bg-center sm:bg-right bg-cover sm:bg-contain top-0 left-0 z-0 transition-all duration-300 ease-in-out hover:scale-105"
        style={{ backgroundImage: `url(${image.src})` }}
      />
      <div className="z-10 flex flex-col gpa-2 ">
        <span className="text-base">{contentType}</span>
        <h3 className="text-3xl">
          <Link href="/shop" aria-label="shop link">
            {title}
          </Link>
        </h3>
        {isClicable && (
          <div className="mt-8 text-black hover:text-white hover:bg-black hover:ring-black ring-2 ring-gray-200 transition-all duration-300 ease-in-out py-1.5 px-6 flex items-center justify-center w-max">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2"
              aria-label="shop link"
            >
              Shop Now <ArrowRightLong />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
