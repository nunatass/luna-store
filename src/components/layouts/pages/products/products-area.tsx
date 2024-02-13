'use client';

import { CloseTwoIcon } from '@/components/icons';
import { SidePanel } from '@/components/layouts/side-panel';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/api/use-product';
import { useFilter } from '@/hooks/use-filter';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductsAreaLoading } from '../../loadings/pages/products/products-area-loading';
import { ProductItem } from '../../product-item';
import { ProductAreaHeader } from './components/product-area-header';
import { ProductFilterArea } from './product-details/product-filter-area';

const productAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  layout: true,
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export function ProductsArea() {
  const {
    data: products,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useProducts();
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

  const productItems = useMemo(
    () =>
      products.filter((product) => {
        const categoryMatches =
          filterCategory === null || product.category?.name === filterCategory;
        const priceMatches =
          product.prices.length > 0 &&
          product.prices[0].value <= filterPrice * 100;
        return categoryMatches && priceMatches;
      }),
    [filterCategory, filterPrice, products]
  );

  let content: ReactNode | null = null;

  if (isPending) {
    content = <ProductsAreaLoading />;
  }

  if (!isPending && isError) {
    return null;
  }

  const renderNotFound = () => {
    if (!isPending && productItems.length === 0) {
      return (
        <div className="absolute left-1/2 top-[20%] flex -translate-x-1/2 flex-col gap-4 sm:top-[30%] lg:left-[60%]">
          <p>No item found</p>
          <Button onClick={resetFilter}>Reset filters</Button>
        </div>
      );
    }
    return content;
  };

  if (!isPending && !isError && products?.length > 0) {
    content = (
      <AnimatePresence>
        {productItems.map((product) => (
          <motion.div key={product.id} {...productAnimationProps}>
            <ProductItem product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }

  return (
    <section className="container mb-20 mt-10 overflow-x-hidden">
      <div className="">
        <div className="flex w-full md:gap-4">
          <ProductFilterArea />
          <SidePanel
            isOpen={isFilterPanelOpen}
            setIsOpen={setIsFilterPanelOpen}
          >
            <div className="flex flex-col px-8">
              <div className="absolute left-0 right-0 top-0 flex w-full items-center justify-between border-b-[0.5px] bg-white p-8 pb-4">
                <h4 className="text-base font-semibold">Filter products</h4>
                <button
                  onClick={handleCloseSideFilter}
                  type="button"
                  aria-label="button close cart"
                  className="z-50 flex h-8 w-8 items-center justify-center bg-gray-200"
                >
                  <div className="transition-all duration-300 ease-in-out hover:rotate-90">
                    <CloseTwoIcon aria-label="close icon" />
                  </div>
                </button>
              </div>
              <ProductFilterArea className="mt-24 block w-full" />
            </div>
          </SidePanel>
          <div className="w-full">
            <ProductAreaHeader />
            <InfiniteScroll
              dataLength={productItems.length}
              next={fetchNextPage}
              hasMore={hasNextPage && productItems.length > 0}
              loader={
                <Skeleton className="h-96 w-40 max-w-80 rounded-none sm:w-full" />
              }
              endMessage={renderNotFound()}
              className={cn(
                'flex w-full flex-wrap justify-center justify-items-center gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:justify-items-start'
              )}
            >
              {content}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
