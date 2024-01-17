'use client';

//import ErrorMsg from '@/components/common/error-msg';
//import { HomeTwoPrdLoader } from '@/components/loader';
//import { useGetProductTypeQuery } from '@/redux/features/productApi';
import { Button } from '@/components/ui/button';
import { productData } from '@/data/product-data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ProductItem } from './product-item';
// tabs
const tabs = ['All Collection', 'Bracelets', 'Necklaces', 'Earrings'];

const productAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  layout: true,
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const ProductArea = () => {
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
      <div className="flex flex-col items-center lg:items-start w-full">
        <span className="text-[#bd844c] text-lg">Product Collection</span>
        <div className="flex flex-col items-center justify-center lg:items-end lg:justify-between lg:flex-row w-full gap-2 lg:gap-0">
          <h3 className="font-medium text-4xl sm:text-5xl text-center">
            Discover our Products
          </h3>
          <div className="flex flex-col w-full max-w-sm">
            <nav className="flex w-full" id="nav-tab" role="tablist">
              {tabs.map((tab, i) => (
                <Button
                  variant="ghost"
                  key={i}
                  onClick={() => handleActiveTab(tab)}
                  className={cn(
                    'hover:bg-white text-gray-400 rounded-none transition-all duration-300 ease-in-out',
                    activeTab === tab && 'text-black'
                  )}
                >
                  {tab}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <div className="w-full flex justify-center flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 justify-items-center lg:justify-items-start">
          <AnimatePresence>
            {product_items.map((product) => (
              <motion.div key={product._id} {...productAnimationProps}>
                <ProductItem {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-28 flex items-center justify-center w-full">
      <div className="px-4 sm:container">{content}</div>
    </section>
  );
};
