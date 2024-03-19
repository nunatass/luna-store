'use client';

import { useCategories } from '@/hooks/api/use-categories';
import { useFilter } from '@/hooks/use-filter';
import { capitalize, cn, replaceDashWithSpaces } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HomeIcon } from '../icons';

type BreadcrumbProps = {
  title?: string;
  label?: string;
  disableSecondary?: boolean;
};

export function Breadcrumb({
  title: initialTitle,
  label,
  disableSecondary = false,
}: BreadcrumbProps) {
  const { data: categories, isPending } = useCategories();
  const [title, setTitle] = useState(initialTitle);
  const { setCategory } = useFilter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const pathSegments = pathname.split('/').filter((segment) => segment);

  const routeNames = replaceDashWithSpaces(pathSegments);

  const breadcrumbItems = pathSegments.map((_, index) => {
    const pathLink = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const pathName = routeNames[index];
    return { pathName, pathLink };
  });

  useEffect(() => {
    const category = searchParams.get('category');
    const searchTerm = searchParams.get('searchTerm');

    if (pathname === '/products' && searchTerm) {
      return setTitle(`Search: ${searchTerm}`);
    }

    if (!category) {
      return setTitle(initialTitle);
    }

    if (!isPending) {
      setCategory(
        categories.find(
          (c) => c.name.toLocaleLowerCase() === category.toLocaleLowerCase()
        ) ?? null
      );
    }

    setTitle(pathname === '/products' ? capitalize(category) : title);
  }, [
    searchParams,
    title,
    pathname,
    setCategory,
    setTitle,
    initialTitle,
    isPending,
  ]);

  return (
    <nav
      className="container flex flex-col gap-4 sm:flex"
      aria-label="Breadcrumb"
    >
      <h1 className="text-3xl font-medium sm:text-5xl">{title}</h1>
      <ol role="list" className="hidden items-center space-x-4 sm:flex">
        <li>
          <div>
            <a href="/" className={cn('text-gray-500 hover:text-gray-700')}>
              <HomeIcon aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {disableSecondary && (
          <li key={breadcrumbItems[0].pathName}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <span
                className={cn(
                  'ml-4 text-sm font-medium text-gray-500 hover:text-gray-700',
                  pathname === breadcrumbItems[0].pathLink &&
                    'pointer-events-none text-gray-700 '
                )}
                aria-current={
                  pathname === breadcrumbItems[0].pathLink ? 'page' : undefined
                }
              >
                {pathname === breadcrumbItems[0].pathLink
                  ? label || capitalize(breadcrumbItems[0].pathName)
                  : capitalize(breadcrumbItems[0].pathName)}
              </span>
            </div>
          </li>
        )}
        {!disableSecondary &&
          breadcrumbItems.map((item) => (
            <li key={item.pathName}>
              <div className="flex items-center">
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <Link
                  href={item.pathLink}
                  aria-label={item.pathLink}
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
