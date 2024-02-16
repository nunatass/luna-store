import { Product } from '@/common/types';
import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { ReviewForm } from './review-form';
import { ReviewItem } from './review-item';

type ProductReviewsAreaProps = {
  product: Product;
};

export const ProductReviewsArea = ({ product }: ProductReviewsAreaProps) => {
  const renderReviews = useMemo(() => {
    if (product?.reviews?.length > 0) {
      return product?.reviews?.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ));
    }

    return (
      <h3 className="tp-product-details-review-title">
        There are no reviews yet.
      </h3>
    );
  }, [product?.reviews]);

  return (
    <AnimatePresence>
      <div
        className="flex w-full flex-col justify-between gap-y-8 md:flex-row"
        id="nav-review"
        role="tabpanel"
        aria-labelledby="nav-review-tab"
      >
        <div className="w-full">
          {/* reviews */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-medium">Rating & Review</h3>
            {renderReviews}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-2xl font-medium">Review this product</h3>
          <p className="font-gray-600 text-base">
            Your email address will not be published.
          </p>
          <ReviewForm id={product.id} />
        </div>
      </div>
    </AnimatePresence>
  );
};
