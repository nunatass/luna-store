import { productData } from '@/data/products-data';
import { DetailsThumbWrapper } from '../layouts/pages/products/product-details/details-thumb-wrapper';
// import { DetailsWrapper } from '../layouts/pages/products/product-details/details-wrapper';

type PreviewProductModalProps = {
  productId: string;
};

export const PreviewProductModal = ({
  productId,
}: PreviewProductModalProps) => {
  const product = productData.data.find((product) => product.id === productId);
  return (
    <div className="flex h-[60vh] w-[600px]  flex-col gap-14 md:flex-row xl:gap-20">
      <DetailsThumbWrapper
        modal
        imageURLs={product!.imageURLs}
        imgWidth={300}
        imgHeight={200}
      />
    </div>
  );
};
