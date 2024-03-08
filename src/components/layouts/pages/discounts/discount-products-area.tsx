'use client';

import { ProductItem } from '@/components/layouts/product-item';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/api/use-product';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductsAreaLoading } from '../../loadings/pages/products/products-area-loading';

const productAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  layout: true,
  transition: { duration: 0.3, ease: 'easeInOut' },
};

type DiscountProductsAreaProps = {
  discount: number;
};

export function DiscountProductsArea({ discount }: DiscountProductsAreaProps) {
  const {
    data: products,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useProducts('', '', discount);

  let content: ReactNode | null = null;

  if (isPending) {
    content = <ProductsAreaLoading />;
  }

  if (!isPending && isError) {
    return null;
  }

  if (!isPending && !isError && products?.length > 0) {
    content = (
      <AnimatePresence>
        {products?.map((product) => (
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
          <div className="w-full" id="products">
            <InfiniteScroll
              dataLength={products?.length}
              next={fetchNextPage}
              hasMore={hasNextPage && products?.length > 0}
              loader={
                <div className="flex flex-col gap-4 overflow-hidden">
                  <div className="flex w-full flex-wrap justify-center justify-items-center gap-4 ">
                    <Skeleton className="h-60 w-40 rounded-none  sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]" />
                    <Skeleton className="h-60 w-40 rounded-none  sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]" />
                    <Skeleton className="h-60 w-40 rounded-none  sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]" />
                  </div>
                  <span className="text-center">
                    keep scrolling to load more products
                  </span>
                </div>
              }
              className={cn(
                'flex w-full flex-wrap justify-center justify-items-center gap-4 '
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
