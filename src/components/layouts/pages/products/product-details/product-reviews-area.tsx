'use client';

import { useReviewsByProduct } from '@/hooks/api/use-reviews';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { ReviewForm } from './review-form';
import { ReviewItem } from './review-item';
import { ReviewsPagination } from './reviews-pagination';

type ProductReviewsAreaProps = {
  productId: string;
};

export const ProductReviewsArea = ({ productId }: ProductReviewsAreaProps) => {
  const {
    data: reviews,
    fetchNextPage,
    fetchPreviousPage,
  } = useReviewsByProduct(productId);

  const [page, setPage] = useState(0);

  const handleNextPage = useCallback(() => {
    fetchNextPage();
    setPage((page) => page + 1);
  }, [fetchNextPage, setPage]);

  const handlePrevPage = useCallback(() => {
    fetchPreviousPage();
    setPage((page) => page - 1);
  }, [fetchPreviousPage, setPage]);

  const renderReviews = useMemo(() => {
    return (
      reviews &&
      reviews?.pages[page]?.data?.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))
    );
  }, [reviews, page]);

  // if(isPending) {
  //   return
  // }

  return (
    <AnimatePresence>
      <div
        className="container flex w-full flex-col justify-between gap-y-8 md:flex-row"
        id="nav-review"
        role="tabpanel"
        aria-labelledby="nav-review-tab"
      >
        <div className="w-full">
          {/* reviews */}
          <div className="flex h-full flex-col gap-4">
            <h3 className="text-2xl font-medium">Rating & Review</h3>
            <div className="flex h-full flex-col justify-between">
              {renderReviews}
              {reviews && (
                <ReviewsPagination
                  onNextPageChange={handleNextPage}
                  onPreviosPageChange={handlePrevPage}
                  hasNext={page < reviews?.pages[page]?.totalPages - 1 || false}
                  hasPrev={page > 0}
                  currentPage={page + 1}
                />
              )}
              {!reviews && <span>No Review Yet</span>}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-2xl font-medium">Review this product</h3>
          <p className="font-gray-600 text-base">
            Your email address will not be published.
          </p>
          <ReviewForm productId={productId} />
        </div>
      </div>
    </AnimatePresence>
  );
};
