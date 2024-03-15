'use client';

import { Category } from '@/common/types';
import { ProductAreaLoading } from '@/components/layouts/loadings/pages/home/product-area-loading';
import { ProductItem } from '@/components/layouts/product-item';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories } from '@/hooks/api/use-categories';
import { useProducts } from '@/hooks/api/use-product';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const productAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  layout: true,
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const ProductsArea = () => {
  const { data: categories, isPending: isPendingCategories } = useCategories();
  const [tabs, setTabs] = useState<Category[] | null>(categories);
  const [activeTab, setActiveTab] = useState<Category | null>(null);
  const {
    data: products,
    isPending: isProductsPending,
    isError: isProductsError,
    hasNextPage,
    fetchNextPage,
  } = useProducts('', activeTab?.id);

  useEffect(() => {
    if (!isPendingCategories) {
      setTabs(categories);
    }
  }, [setTabs, isPendingCategories]);

  const handleActiveTab = (tab: Category | null) => {
    setActiveTab(tab);
  };

  let content = null;

  if (isProductsPending) {
    content = <ProductAreaLoading />;
  }

  if (isProductsError) {
    return null;
  }

  if (products.length > 0) {
    content = (
      <InfiniteScroll
        dataLength={products.length}
        next={fetchNextPage}
        hasMore={hasNextPage && products.length > 0}
        loader={
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex w-full flex-wrap justify-center justify-items-center gap-4 ">
              <Skeleton className="h-60 w-40 rounded-none  sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]" />
              <Skeleton className="h-60 w-40 rounded-none  sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]" />
              <Skeleton className="h-60 w-40 rounded-none  sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]" />
            </div>
            <span className="text-center text-sm text-gray-500">
              keep scrolling to load more products
            </span>
          </div>
        }
      >
        <div className="mt-6 flex w-full flex-wrap justify-center justify-items-center gap-4">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div key={product.id} {...productAnimationProps}>
                <ProductItem product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </InfiniteScroll>
    );
  }

  return (
    <section className="my-20 flex w-full items-center justify-center md:my-28">
      <div className="px-4 sm:container">
        <div className="flex w-full flex-col items-center lg:items-start">
          <span className="text-lg text-[#bd844c]">Shop by Category</span>
          <div className="flex w-full flex-col items-center justify-center gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
            <h3 className="text-center text-3xl font-medium sm:text-5xl">
              Discover our Products
            </h3>
            <div className="flex w-full max-w-sm flex-col lg:mr-10">
              <nav className="flex w-full gap-5" id="nav-tab" role="tablist">
                <Button
                  variant="ghost"
                  role="tab"
                  aria-selected={activeTab === null ? 'true' : 'false'}
                  aria-controls={`tab-all`}
                  id={`tab-all`}
                  onClick={() => handleActiveTab(null)}
                  className={cn(
                    'relative rounded-none px-1 text-[11px] text-gray-600 transition-all duration-300 ease-in-out hover:bg-white sm:text-[14px] ',
                    activeTab === null && 'text-black'
                  )}
                >
                  All Categories
                  {activeTab === null && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-gray-100"
                      layout
                      layoutId="tab-selected"
                    />
                  )}
                </Button>
                {tabs?.map((tab, i) => (
                  <Button
                    variant="ghost"
                    key={i}
                    role="tab"
                    aria-selected={activeTab === tab ? 'true' : 'false'}
                    aria-controls={`tab-${i}`}
                    id={`tab-${i}`}
                    onClick={() => handleActiveTab(tab)}
                    className={cn(
                      'relative rounded-none px-1 text-[11px] text-gray-600 transition-all duration-300 ease-in-out sm:text-[14px] md:hover:bg-white ',
                      activeTab === tab && 'text-black'
                    )}
                  >
                    {tab?.name}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-gray-200"
                        layout
                        layoutId="tab-selected"
                      />
                    )}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
          {content}
        </div>
      </div>
    </section>
  );
};
