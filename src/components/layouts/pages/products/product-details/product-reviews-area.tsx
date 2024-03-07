'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useReviewsByProduct } from '@/hooks/api/use-reviews';
import { AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ReviewForm } from './review-form';
import { ReviewItem } from './review-item';

type ProductReviewsAreaProps = {
  productId: string;
};

export const ProductReviewsArea = ({ productId }: ProductReviewsAreaProps) => {
  const { data: reviews, isPending, isError } = useReviewsByProduct(productId);

  const [page] = useState(0);

  const renderReviews = useMemo(() => {
    if (isPending) {
      return Array.from({ length: 5 }, (_, index) => (
        <div className="mt-4 flex items-center gap-2" key={index}>
          <Skeleton className="ml-4 h-40 w-72 rounded-none" />
        </div>
      ));
    }
    return (
      reviews &&
      reviews?.pages[page]?.data?.map((review) => (
        <CarouselItem
          className="basis-1/1 md:w-md w-full md:basis-1/2 lg:w-full lg:basis-1/3"
          key={review.id}
        >
          <ReviewItem review={review} />
        </CarouselItem>
      ))
    );
  }, [reviews, page, isPending]);

  return (
    <AnimatePresence>
      <div
        className="container flex w-full flex-col justify-between gap-y-8"
        id="nav-review"
        role="tabpanel"
        aria-labelledby="nav-review-tab"
      >
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-2xl font-medium">Review this product</h3>
          <p className="font-gray-600 text-sm">
            Your email address will not be published.
          </p>
          <ReviewForm productId={productId} />
        </div>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>{renderReviews}</CarouselContent>
          {!isPending && !isError && reviews?.pages[0].data.length > 0 && (
            <div className="relative mt-8 hidden w-full md:block">
              <CarouselPrevious className="absolute right-0 ml-12" />
              <CarouselNext className="right-0" />
            </div>
          )}
        </Carousel>
      </div>
    </AnimatePresence>
  );
};
