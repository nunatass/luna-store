'use client';

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
  const {
    data: products,
    isPending: isProductsPending,
    isError: isProductsError,
    hasNextPage,
    fetchNextPage,
  } = useProducts();
  const { data: categories, isPending: isPendingCategories } = useCategories();
  const [tabs, setTabs] = useState([
    'All Collection',
    ...categories.map((category) => category.name),
  ]);

  useEffect(() => {
    if (!isPendingCategories) {
      setTabs([
        'All Collection',
        ...categories.map((category) => category.name),
      ]);
    }
  }, [setTabs, isPendingCategories]);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleActiveTab = (tab: string) => {
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
    let productItems = products;

    if (activeTab !== 'All Collection') {
      productItems = products.filter(
        (product) => product.category.name === activeTab
      );
    }

    content = (
      <InfiniteScroll
        dataLength={productItems.length}
        next={fetchNextPage}
        hasMore={hasNextPage && productItems.length > 0}
        loader={
          <Skeleton className="h-96 w-40 max-w-80 rounded-none sm:w-full" />
        }
      >
        <div className="mt-6 flex w-full flex-wrap justify-center justify-items-center gap-4 sm:grid sm:grid-cols-2 md:mt-12 md:grid-cols-3 lg:grid-cols-4 lg:justify-items-start">
          <AnimatePresence>
            {productItems.map((product) => (
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
                {tabs.map((tab, i) => (
                  <Button
                    variant="ghost"
                    key={i}
                    onClick={() => handleActiveTab(tab)}
                    className={cn(
                      'relative rounded-none px-0 text-gray-400 transition-all duration-300 ease-in-out hover:bg-white',
                      activeTab === tab && 'text-black'
                    )}
                  >
                    {tab}
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