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
    <div className={cn('relative group', className)}>
      <Image
        src={image}
        alt="instagram img"
        className="max-w h-full relative "
      />
      <div className="w-full h-full bg-black absolute top-0 right-0 opacity-0 group-hover:opacity-25 ease-in-out transition-all duration-300" />
      <div className="absolute z-20 top-1/2 left-1/2 bg-white w-14 h-14 -translate-x-1/2 -translate-y-[calc(50% - 40px)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 shadow-sm transform-all ease-in-out hover:bg-[#821f40] hover:text-white text-black group-hover:-translate-y-[20px] ">
        <a href={link} target="_blank" aria-label="instagram link">
          <InstagramIcon className="w-4 h-4" aria-label="instagram icon" />
        </a>
      </div>
    </div>
  );
}
