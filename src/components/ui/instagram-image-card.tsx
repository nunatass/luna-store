import { cn } from '@/lib/utils';
import { InstagramIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

type InstagramImageCardProps = {
  image: StaticImageData;
  link: string;
  className?: string;
};

export function InstagramImageCard({
  image,
  link,
  className,
}: InstagramImageCardProps) {
  return (
    <div className={cn('group relative', className)}>
      <Image
        src={image}
        alt="instagram img"
        className="max-w relative h-full "
      />
      <div className="absolute right-0 top-0 h-full w-full bg-black opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-25" />
      <div className="-translate-y-[calc(50% - 40px)] transform-all absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-sm duration-300 ease-in-out hover:bg-[#821f40] hover:text-white group-hover:-translate-y-[20px] group-hover:opacity-100 ">
        <a href={link} target="_blank" aria-label="instagram link">
          <InstagramIcon className="h-4 w-4" aria-label="instagram icon" />
        </a>
      </div>
    </div>
  );
}
