import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type HomeCollectionsItemProps = {
  className?: string;
  link: string;
  image: string;
  title: string;
};

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const HomeCollectionsItem = ({
  className,
  image,
  link,
  title,
}: HomeCollectionsItemProps) => {
  return (
    <Link
      href={link}
      aria-label="shop link"
      className={cn(
        'group relative flex h-64 w-full justify-between overflow-hidden px-8 py-8',
        className
      )}
    >
      <Image
        src={`${imageUrlPrefix}/${image}`}
        fill
        alt="collection banner"
        className="object-cover  transition-all duration-300 ease-in-out group-hover:scale-110"
      />
      <div className="gpa-2 z-10 flex flex-col justify-end text-black">
        <span className="text-base">Collection</span>
        <h3 className="bg-[#be844c]/20 text-xl uppercase">{title}</h3>
      </div>
    </Link>
  );
};
