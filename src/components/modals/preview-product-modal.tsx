'use client';

import { useProductById } from '@/hooks/api/use-product';
import { DetailsThumbWrapper } from '../layouts/pages/products/product-details/details-thumb-wrapper';
import { Skeleton } from '../ui/skeleton';

type PreviewProductModalProps = {
  productId: string;
};

export const PreviewProductModal = ({
  productId,
}: PreviewProductModalProps) => {
  const { data: product, isPending, isError } = useProductById(productId);

  if (isPending) {
    return (
      <div className="flex h-[60vh] w-[600px]  flex-col gap-14 md:flex-row xl:gap-20">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  if (!isPending && isError) {
    return null;
  }

  if (!isPending && !isError && !product) {
    return null;
  }

  return (
    <div className="flex h-[60vh] w-[600px]  flex-col gap-14 md:flex-row xl:gap-20">
      <DetailsThumbWrapper
        modal
        imageURLs={product.medias}
        imgWidth={300}
        imgHeight={200}
      />
    </div>
  );
};
