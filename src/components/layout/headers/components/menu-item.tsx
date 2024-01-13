'use client';
import { useSticky } from '@/hooks/use-sticky';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

type MenuItemProps = {
  hasDropdown?: boolean;
  link: string;
  title: string;
  className?: string;
  children?: ReactNode;
};

export function MenuItem({
  hasDropdown = false,
  link,
  title,
  children,
  className,
}: MenuItemProps) {
  const { sticky } = useSticky();
  return (
    <li className={cn('flex flex-col', className)}>
      <Link
        href={link}
        className={cn(
          'flex items-center justify-center',
          'hover:text-white',
          sticky && 'hover:text-[#be844c]'
        )}
      >
        <span>{title}</span>
        {hasDropdown && <ChevronDown className="ml-[2px] h-4 w-4" />}
      </Link>
      {children}
    </li>
  );
}
