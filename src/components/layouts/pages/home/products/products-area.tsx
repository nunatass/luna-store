'use client';

//import ErrorMsg from '@/components/common/error-msg';
//import { HomeTwoPrdLoader } from '@/components/loader';
//import { useGetProductTypeQuery } from '@/redux/features/productApi';
import { Button } from '@/components/ui/button';
import { productData } from '@/data/products-data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ProductItem } from '../../../product-item';
// tabs
const tabs = ['All Collection', 'Bracelets', 'Necklaces', 'Earrings'];

const productAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  layout: true,
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const ProductsArea = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const products = productData;
  // const {
  //   data: products,
  //   isError,
  //   isLoading,
  // } = useGetProductTypeQuery({ type: 'jewelry' });

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  // decide what to render
  let content = null;

  // if (isLoading) {
  //   content = <HomeTwoPrdLoader loading={isLoading} />;
  // }
  // if (!isLoading && isError) {
  //   content = <ErrorMsg msg="There was an error" />;
  // }
  // if (!isLoading && !isError && products?.data?.length === 0) {
  //   content = <ErrorMsg msg="No Products found!" />;
  // }
  if (/*!isLoading && !isError &&*/ products?.data?.length > 0) {
    let product_items = products.data;
    if (activeTab === 'All Collection') {
      product_items = products.data;
    } else if (activeTab === 'Bracelets') {
      product_items = products.data.filter(
        (p) => p.category.name === 'Bracelets'
      );
    } else if (activeTab === 'Necklaces') {
      product_items = products.data.filter(
        (p) => p.category.name === 'Necklaces'
      );
    } else if (activeTab === 'Earrings') {
      product_items = products.data.filter(
        (p) => p.category.name === 'Earrings'
      );
    } else {
      product_items = products.data;
    }
    content = (
      <div className="flex w-full flex-col items-center lg:items-start">
        <span className="text-lg text-[#bd844c]">Product Collection</span>
        <div className="flex w-full flex-col items-center justify-center gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <h3 className="text-center text-3xl font-medium sm:text-5xl">
            Discover our Products
          </h3>
          <div className="flex w-full max-w-sm flex-col lg:mr-10">
            <nav className="flex w-full" id="nav-tab" role="tablist">
              {tabs.map((tab, i) => (
                <Button
                  variant="ghost"
                  key={i}
                  onClick={() => handleActiveTab(tab)}
                  className={cn(
                    'rounded-none text-gray-400 transition-all duration-300 ease-in-out hover:bg-white',
                    activeTab === tab && 'text-black'
                  )}
                >
                  {tab}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-6 flex w-full flex-wrap justify-center justify-items-center gap-4 sm:grid sm:grid-cols-2 md:mt-12 md:grid-cols-3 lg:grid-cols-4 lg:justify-items-start">
          <AnimatePresence>
            {product_items.map((product) => (
              <motion.div key={product.id} {...productAnimationProps}>
                <ProductItem {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <section className="my-20 flex w-full items-center justify-center md:my-28">
      <div className="px-4 sm:container">{content}</div>
    </section>
  );
};
