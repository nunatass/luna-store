'use client';

import { Button } from '@/components/ui/button';
import { useFilter } from '@/hooks/use-filter';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { CategoryFilter } from './category-filter';
import { PriceFilter } from './price-filter';

type ProductFilterAreaProps = {
  className?: string;
};

export function ProductFilterArea({ className }: ProductFilterAreaProps) {
  const { setPrice, resetFilter } = useFilter();

  const handleClearFilter = useCallback(() => {
    window.history.replaceState(null, '', '/products');
    resetFilter();
    setPrice(1199);
  }, [resetFilter]);
  return (
    <section>
      <div className={cn('hidden w-72 lg:block', className)}>
        <div className="flex flex-col gap-4">
          <PriceFilter
            handleChanges={setPrice}
            step={1}
            maxValue={1199}
            minValue={40}
          />
          <CategoryFilter />
          <div className="divide flex flex-col items-end divide-y-[1.5px]">
            <h3 className="w-full text-left text-lg font-medium">
              Reset Filters
            </h3>
            <span className="mb-4 mt-2 h-[1.5] w-full bg-gray-300" />
            <Button size="lg" className="" onClick={handleClearFilter}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
