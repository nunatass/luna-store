'use client';

import { CloseTwoIcon } from '@/components/icons';
import { SidePanel } from '@/components/layouts/side-panel';
import { Button } from '@/components/ui/button';
import { useFilter } from '@/hooks/use-filter';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo } from 'react';
import { productData } from '../../../../data/products-data';
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
  const products = productData;
  // const { data: products, isError, isLoading } = useGetAllProductsQuery();
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
      products.data.filter(
        (product) =>
          (product.category.name === filterCategory ||
            filterCategory === null) &&
          product.price <= filterPrice
      ),
    [filterCategory, filterPrice, products.data]
  );

  // Load the maximum price once the products have been loaded
  // useEffect(() => {
  //   if (!isLoading && !isError && products?.data?.length > 0) {
  //     const maxPrice = products.data.reduce((max, product) => {
  //       return product.price > max ? product.price : max;
  //     }, 0);
  //     setPriceValue([0, maxPrice]);
  //   }
  // }, [isLoading, isError, products]);

  // handleChanges
  // const handleChanges = (val) => {
  //   setCurrPage(1);
  //   setPriceValue(val);
  // };

  // selectHandleFilter
  // const selectHandleFilter = (e) => {
  //   setSelectValue(e.value);
  // };

  // other props
  // const otherProps = {
  //   priceFilterValues: {
  //     priceValue,
  //     handleChanges,
  //   },
  //   selectHandleFilter,
  //   currPage,
  //   setCurrPage,
  // };
  // decide what to render
  // const content = null;

  // if (isLoading) {
  //   content = <ShopLoader loading={isLoading}/>;
  // }
  // if (!isLoading && isError) {
  //   content = <div className="pb-80 text-center"><ErrorMsg msg="There was an error" /></div>;
  // }
  // if (!isLoading && !isError && products?.data?.length === 0) {
  //   content = <ErrorMsg msg="No Products found!" />;
  // }
  if (/*!isLoading && !isError &&*/ products?.data?.length > 0) {
    // products
    // const product_items = products.data;
    // select short filtering
    // if (selectValue) {
    //   if (selectValue === 'Default Sorting') {
    //     product_items = products.data;
    //   } else if (selectValue === 'Low to High') {
    //     product_items = products.data
    //       .slice()
    //       .sort((a, b) => Number(a.price) - Number(b.price));
    //   } else if (selectValue === 'High to Low') {
    //     product_items = products.data
    //       .slice()
    //       .sort((a, b) => Number(b.price) - Number(a.price));
    //   } else if (selectValue === 'New Added') {
    //     product_items = products.data.slice();
    //     // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //   } else if (selectValue === 'On Sale') {
    //     product_items = products.data.filter((p) => p.discount > 0);
    //   } else {
    //     // product_items = products.data;
    //   }
    // }
    // price filter
    // product_items = product_items.filter(
    //   (p) => p.price >= priceValue[0] && p.price <= priceValue[1]
    // );
    // status filter
    // if (query.status) {
    //   if (query.status === "on-sale") {
    //     product_items = product_items.filter((p) => p.discount > 0);
    //   } else if (query.status === "in-stock") {
    //     product_items = product_items.filter((p) => p.status === "in-stock");
    //   }
    // }
    // category filter
    // if (query.category) {
    //   product_items = product_items.filter(
    //     (p) =>
    //       p.parent.toLowerCase().replace("&", "").split(" ").join("-") ===
    //       query.category
    //   );
    // }
    // category filter
    // if (query.subCategory) {
    //   product_items = product_items.filter(
    //     (p) =>
    //       p.children.toLowerCase().replace("&", "").split(" ").join("-") ===
    //       query.subCategory
    //   );
    // }
    // color filter
    // if (query.color) {
    //   product_items = product_items.filter((product) => {
    //     for (let i = 0; i < product.imageURLs.length; i++) {
    //       const color = product.imageURLs[i]?.color;
    //       if (
    //         color &&
    //         color?.name.toLowerCase().replace("&", "").split(" ").join("-") ===
    //           query.color
    //       ) {
    //         return true; // match found, include product in result
    //       }
    //     }
    //     return false; // no match found, exclude product from result
    //   });
    // }
    // brand filter
    // if (query.brand) {
    //   product_items = product_items.filter(
    //     (p) =>
    //       p.brand.name.toLowerCase().replace("&", "").split(" ").join("-") ===
    //       query.brand
    //   );
    // }
    // content = (
    //   <>
    //     <ShopArea
    //       all_products={products.data}
    //       products={product_items}
    //       otherProps={otherProps}
    //     />
    //     <ShopFilterOffCanvas
    //       all_products={products.data}
    //       otherProps={otherProps}
    //     />
    //   </>
    // );
  }

  return (
    <section className="container mb-20 mt-10">
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
            <div
              className={cn(
                '-mt-20 flex h-full w-full flex-wrap justify-center justify-items-center gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:justify-items-start',
                productItems.length === 0 && 'flex items-center justify-center'
              )}
            >
              <AnimatePresence>
                {productItems.length > 0 &&
                  productItems.map((product) => (
                    <motion.div key={product.id} {...productAnimationProps}>
                      <ProductItem {...product} />
                    </motion.div>
                  ))}
                {productItems.length === 0 && (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <p>No item found</p>
                    <Button onClick={resetFilter}>Reset filters</Button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
