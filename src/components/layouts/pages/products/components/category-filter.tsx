'use client';

import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/api/use-categories';
import { useFilter } from '@/hooks/use-filter';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCallback } from 'react';

export const CategoryFilter = () => {
  const { filterCategory, setCategory } = useFilter();

  const { data: categories, isLoading, isError } = useCategories();

  const handleSelectCategory = useCallback(
    (name: string) => {
      setCategory(name);
    },
    [setCategory]
  );

  if (isLoading) {
    return 'loading...';
  }
  if (!isLoading && isError) {
    return null;
  }

  return (
    <div className="divide flex flex-col divide-y-[1.5px]">
      <h3 className="text-lg font-medium">Categories</h3>
      <div className="my-2 py-4">
        <ul className="max-h-80 overflow-y-scroll">
          {categories.map((category) => (
            <li key={category.id} className="group">
              <Link
                aria-label={category.name}
                href={`/products?category=${category.name.toLocaleLowerCase()}`}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleSelectCategory(category.name)}
                  className={cn(
                    'flex w-full items-center justify-between px-1.5 text-sm  text-gray-500 transition-all duration-100 ease-in-out group-hover:bg-white group-hover:text-primary',
                    filterCategory === category.name &&
                      'font-medium text-primary'
                  )}
                >
                  {category.name}
                  <span
                    className={cn(
                      'rounded-2 flex h-5 min-w-5 items-center justify-center rounded-lg p-1 ring-1 ring-gray-200 transition-all duration-100 ease-in-out group-hover:bg-primary group-hover:text-white group-hover:ring-primary',
                      filterCategory === category.name &&
                        'bg-primary text-white ring-primary'
                    )}
                  >
                    {category.total}
                  </span>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
