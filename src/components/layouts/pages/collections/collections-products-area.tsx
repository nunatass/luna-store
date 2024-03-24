'use client';

import { ProductItem } from '@/components/layouts/product-item';
import { useCollectionById } from '@/hooks/api/use-collections';
import { AnimatePresence, motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { ProductsAreaLoading } from '../../loadings/pages/products/products-area-loading';

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

  let content: ReactNode | null = null;

  if (isPending) {
    content = <ProductsAreaLoading />;
  }

  if (!isPending && isError) {
    return notFound();
  }

  if (!isPending && !isError && collection?.products?.length > 0) {
    content = (
      <AnimatePresence>
        {collection.products?.map((product) => (
          <motion.div key={product.id} {...productAnimationProps}>
            <ProductItem product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }

  return (
    <section className="container mb-20 mt-8 overflow-x-hidden">
      <div className=" w-full" id="products">
        <div className="flex w-full flex-wrap justify-center gap-4">
          {content}
        </div>
      </div>
    </section>
  );
}
