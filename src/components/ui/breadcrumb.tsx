'use client';

import { capitalize, cn, replaceDashWithSpaces } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '../icons';

type BreadcrumbProps = {
  title?: string;
  label?: string;
};

export function Breadcrumb({ title, label }: BreadcrumbProps) {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter((segment) => segment);

  const routeNames = replaceDashWithSpaces(pathSegments);

  const breadcrumbItems = pathSegments.map((_, index) => {
    const pathLink = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const pathName = routeNames[index];
    return { pathName, pathLink };
  });

  return (
    <nav
      className="container flex flex-col gap-4 sm:flex"
      aria-label="Breadcrumb"
    >
      <h3 className="text-3xl font-medium sm:text-5xl">{title}</h3>
      <ol role="list" className="hidden items-center space-x-4 sm:flex">
        <li>
          <div>
            <a href="/" className={cn('text-gray-500 hover:text-gray-700')}>
              <HomeIcon aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {breadcrumbItems.map((item) => (
          <li key={item.pathName}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={item.pathLink}
                className={cn(
                  'ml-4 text-sm font-medium text-gray-500 hover:text-gray-700',
                  pathname === item.pathLink &&
                    'pointer-events-none text-gray-700 '
                )}
                aria-current={pathname === item.pathLink ? 'page' : undefined}
              >
                {pathname === item.pathLink
                  ? label || capitalize(item.pathName)
                  : capitalize(item.pathName)}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
