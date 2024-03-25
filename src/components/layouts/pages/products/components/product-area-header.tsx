import { FilterIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useFilter } from '@/hooks/use-filter';
import { useCallback } from 'react';

export const ProductAreaHeader = () => {
  const { setIsFilterPanelOpen } = useFilter();

  const handleShowFilter = useCallback(() => {
    setIsFilterPanelOpen(true);
  }, [setIsFilterPanelOpen]);

  return (
    <div className="mb-8 flex w-full items-center justify-between ring-1 ring-gray-300 lg:hidden">
      <span className="h-full border-r border-gray-500 px-4 text-sm text-gray-500">
        Filter Products
      </span>
      <div className="flex items-center gap-4">
        <Button className="flex gap-2" onClick={handleShowFilter}>
          <FilterIcon />
        </Button>
      </div>
    </div>
  );
};
