'use client';

import { CloseTwoIcon } from '@/components/icons';
import { ProductItem } from '@/components/layouts/product-item';
import { SidePanel } from '@/components/layouts/side-panel';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { keys, useProducts } from '@/hooks/api/use-product';
import { useFilter } from '@/hooks/use-filter';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductsAreaLoading } from '../../loadings/pages/products/products-area-loading';
import { ProductAreaHeader } from './components/product-area-header';
import { ProductFilterArea } from './components/product-filter-area';

import Image from 'next/image';

import { productsBanner } from '@/data/product-banner-data';
import { useCategories } from '@/hooks/api/use-categories';
import { useSticky } from '@/hooks/use-sticky';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ProductsArea() {
  const productsContainer = useRef(null);

  const { scrollYProgress } = useScroll({
    target: productsContainer,
    offset: ['start start', 'end end'],
  });

  const position = useTransform(scrollYProgress, [0, 1], [100, -250]);

  const searchParams = useSearchParams();

  const { sticky } = useSticky(386);

  const { data: categories, isPending: isCategoryPending } = useCategories();

  const router = useRouter();

  const queryClient = useQueryClient();

  const searchTerm = searchParams.get('searchTerm') || '';
  const {
    isFilterPanelOpen,
    setIsFilterPanelOpen,
    filterCategory,
    filterPrice,
    resetFilter,
    setCategory,
  } = useFilter();

  const {
    data: products,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useProducts(searchTerm, filterCategory?.id);

  const handleCloseSideFilter = useCallback(() => {
    setIsFilterPanelOpen(false);
  }, [setIsFilterPanelOpen]);

  const productItems = useMemo(
    () =>
      products.filter((product) => {
        const priceMatches =
          product.prices.length > 0 &&
          product.prices[0].value <= filterPrice * 100;
        return priceMatches;
      }),
    [filterPrice, products]
  );

  const handleClearFilter = useCallback(() => {
    router.replace('/products?searchTerm=');
    queryClient.invalidateQueries({
      queryKey: keys.all,
    });

    resetFilter();
  }, [resetFilter, queryClient, router]);

  useEffect(() => {
    const selectedCategory = searchParams.get('category');
    if (!selectedCategory) {
      return resetFilter();
    }
    if (!!selectedCategory && !isCategoryPending) {
      setCategory(
        categories.find(
          (c) =>
            c.name.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()
        ) ?? null
      );
    }
  }, [searchParams, resetFilter, setCategory, isCategoryPending]);

  useEffect(handleCloseSideFilter, [searchParams, handleCloseSideFilter]);

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
          <Button onClick={handleClearFilter}>Reset</Button>
        </div>
      );
    }
  };

  if (!isPending && !isError && products?.length > 0) {
    content = productItems.map((product) => (
      <div key={product.id}>
        <ProductItem product={product} />
      </div>
    ));
  }

  return (
    <section className="container mb-20 mt-16 overflow-x-hidden">
      <div className="relative my-12">
        <Image
          src={
            productsBanner[filterCategory?.name?.toLocaleLowerCase() || 'all']
              .image
          }
          alt="menu popular"
          width={350}
          height={300}
          className="mt-8 h-[300px] w-full object-cover"
          unoptimized
        />
        <div className="absolute -left-2 bottom-6 ml-8 flex flex-col gap-4 text-white sm:left-6">
          <h1 className="text-3xl font-medium md:text-4xl">
            {filterCategory?.name || 'Products'}
          </h1>

          <p className="max-w-[400px] text-xs sm:text-sm">
            {
              productsBanner[filterCategory?.name.toLocaleLowerCase() || 'all']
                .description
            }
          </p>
        </div>
      </div>
      <ProductAreaHeader />

      <div ref={productsContainer} className="relative flex w-full md:gap-4">
        <div>
          <motion.div
            className={cn('fixed w-72 opacity-0', sticky && 'opacity-1')}
            style={{ top: position.get() > -250 ? 100 : position }}
          >
            <ProductFilterArea />
          </motion.div>
          <div
            className={cn('hidden w-72 lg:block', sticky && '-z-10 opacity-0')}
          >
            <ProductFilterArea />
          </div>
        </div>
        <SidePanel isOpen={isFilterPanelOpen} setIsOpen={setIsFilterPanelOpen}>
          <div className="flex flex-col px-8">
            <div className="absolute left-0 right-0 top-0 flex w-full items-center justify-between border-b-[0.5px] bg-white p-8 pb-4">
              <h4 className="text-lg font-semibold">Filter products</h4>
              <Button
                aria-label="close button"
                onClick={handleCloseSideFilter}
                className="z-50 flex h-12 w-12  items-center justify-center bg-gray-200 text-black md:h-8 md:w-8 md:hover:bg-gray-200"
              >
                <div className="transition-all duration-300 ease-in-out md:hover:rotate-90">
                  <CloseTwoIcon aria-label="close icon" />
                </div>
              </Button>
            </div>
            <ProductFilterArea className="mt-28 block w-full" />
          </div>
        </SidePanel>
        <div id="products">
          <InfiniteScroll
            dataLength={productItems.length}
            next={fetchNextPage}
            hasMore={hasNextPage && productItems.length > 0}
            loader={
              <div className="flex flex-col gap-4 overflow-hidden">
                <div className="flex w-full flex-wrap justify-center justify-items-center gap-4 ">
                  <Skeleton className="h-60 w-40 rounded-none  sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]" />
                  <Skeleton className="h-60 w-40 rounded-none  sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]" />
                  <Skeleton className="hidden h-60 w-40  rounded-none sm:h-[400px] sm:w-64 md:block md:h-96 md:w-80 lg:h-[400px]" />
                  <Skeleton className="hidden h-60 w-40  rounded-none sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:block lg:h-[400px]" />
                </div>
                <span className="text-center">
                  keep scrolling to load more products
                </span>
              </div>
            }
            endMessage={renderNotFound()}
            className={cn(
              'flex w-full flex-wrap justify-center justify-items-center gap-4 '
            )}
          >
            {content}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}
