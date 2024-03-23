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
    <div className="my-4 flex h-12 w-full items-center justify-end md:px-2 lg:hidden ">
      <div />
      <div className="flex items-center gap-4">
        <Button className=" right-8 flex gap-2" onClick={handleShowFilter}>
          <FilterIcon />
        </Button>
      </div>
    </div>
  );
};
