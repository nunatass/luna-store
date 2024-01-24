'use client';

import { Product } from '@/common/types';
import { DetailsTabNav } from './details-tab-nav';
import { DetailsThumbWrapper } from './details-thumb-wrapper';
import { DetailsWrapper } from './details-wrapper';

type ProductDetailsAreaProps = {
  productItem: Product;
};

export const ProductDetailsArea = ({
  productItem,
}: ProductDetailsAreaProps) => {
  const { imageURLs } = productItem;

  return (
    <section className="container pb-20 pt-8">
      <div className="flex flex-col gap-14 md:flex-row xl:gap-20">
        <DetailsThumbWrapper
          imageURLs={imageURLs}
          imgWidth={580}
          imgHeight={670}
        />
        <DetailsWrapper productItem={productItem} />
      </div>
      <DetailsTabNav product={productItem} />
    </section>
  );
};
