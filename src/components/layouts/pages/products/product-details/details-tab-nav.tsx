import { Product } from '@/common/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMemo } from 'react';
import { ReviewForm } from './review-form';
import { ReviewItem } from './review-item';

type DetailsTabNavProps = {
  product: Product;
};

export const DetailsTabNav = ({ product }: DetailsTabNavProps) => {
  const { id, description, reviews } = product;

  const renderReviews = useMemo(() => {
    if (reviews.length > 0) {
      return reviews.map((item) => <ReviewItem key={item.id} review={item} />);
    }

    return (
      <h3 className="tp-product-details-review-title">
        There are no reviews yet.
      </h3>
    );
  }, [reviews]);

  return (
    <Tabs
      defaultValue="description"
      className="my-12 flex w-full flex-col items-center justify-center "
    >
      <TabsList className="my-8 rounded-none bg-gray-300 text-gray-600">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="information">Additional information</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="text-base text-gray-700">
        {description}
      </TabsContent>
      <TabsContent value="information">Change your password here.</TabsContent>
      <TabsContent value="reviews" className="w-full">
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
            <ReviewForm id={id} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
