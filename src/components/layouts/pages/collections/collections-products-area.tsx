'use client';

import { CloseTwoIcon } from '@/components/icons';
import { ProductItem } from '@/components/layouts/product-item';
import { SidePanel } from '@/components/layouts/side-panel';
import { Button } from '@/components/ui/button';
import { useCollectionById } from '@/hooks/api/use-collections';
import { useFilter } from '@/hooks/use-filter';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { ProductsAreaLoading } from '../../loadings/pages/products/products-area-loading';
import { ProductAreaHeader } from '../products/components/product-area-header';
import { ProductFilterArea } from '../products/components/product-filter-area';

const productAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  layout: true,
  transition: { duration: 0.3, ease: 'easeInOut' },
};

type CollectionsProductsAreaProps = {
  collectionId: string;
};

export function CollectionsProductsArea({
  collectionId,
}: CollectionsProductsAreaProps) {
  const {
    data: collection,
    isPending,
    isError,
  } = useCollectionById(collectionId);

  const {
    isFilterPanelOpen,
    setIsFilterPanelOpen,
    filterCategory,
    filterPrice,
    resetFilter,
  } = useFilter();

  // handle close cart sidebar
  const handleCloseSideFilter = useCallback(() => {
    setIsFilterPanelOpen(false);
  }, [setIsFilterPanelOpen]);

  useEffect(() => {
    resetFilter();
  }, []);

  const productItems = useMemo(
    () =>
      collection &&
      collection.products.filter((product) => {
        const categoryMatches =
          filterCategory === null ||
          product.category?.name === filterCategory?.name;
        const priceMatches =
          product.prices.length > 0 &&
          product.prices[0].value <= filterPrice * 100;
        return categoryMatches && priceMatches;
      }),
    [filterCategory, filterPrice, collection]
  );

  let content: ReactNode | null = null;

  if (isPending) {
    content = <ProductsAreaLoading />;
  }

  if (!isPending && isError) {
    return notFound();
  }

  const renderNotFound = () => {
    if (!isPending && productItems?.length === 0) {
      return (
        <div className="absolute left-1/2 top-[20%] flex -translate-x-1/2 flex-col gap-4 sm:top-[30%] lg:left-[60%]">
          <p>No item found</p>
          <Button onClick={resetFilter}>Reset filters</Button>
        </div>
      );
    }
  };

  if (!isPending && !isError && collection.products?.length > 0) {
    content = (
      <AnimatePresence>
        {productItems?.map((product) => (
          <motion.div key={product.id} {...productAnimationProps}>
            <ProductItem product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }

  return (
    <section className="container mb-20 mt-8 overflow-x-hidden">
      <div className="relative">
        <div className="flex w-full md:gap-4">
          <ProductFilterArea />
          <SidePanel
            isOpen={isFilterPanelOpen}
            setIsOpen={setIsFilterPanelOpen}
          >
            <div className="flex flex-col px-8">
              <div className="absolute left-0 right-0 top-0 flex w-full items-center justify-between border-b-[0.5px] bg-white p-8 pb-4">
                <h3 className="text-base font-semibold">Filter products</h3>
                <button
                  onClick={handleCloseSideFilter}
                  type="button"
                  aria-label="button close cart"
                  className="z-50 flex h-8 w-8 items-center justify-center bg-gray-200"
                >
                  <div className="transition-all duration-300 ease-in-out md:hover:rotate-90">
                    <CloseTwoIcon aria-label="close icon" />
                  </div>
                </button>
              </div>
              <ProductFilterArea className="mt-24 block w-full" />
            </div>
          </SidePanel>
          <div className=" w-full" id="products">
            <ProductAreaHeader />
            <div
              className={cn(
                'flex w-full flex-wrap justify-center justify-items-center gap-4'
              )}
            >
              {content}
              {renderNotFound()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
