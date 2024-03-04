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
    <div className="container my-4 flex h-12 w-full items-center justify-center md:px-2 lg:hidden">
      <div />
      <Button
        className="absolute right-8  top-52 flex gap-2"
        onClick={handleShowFilter}
      >
        <FilterIcon />
      </Button>
    </div>
  );
};
