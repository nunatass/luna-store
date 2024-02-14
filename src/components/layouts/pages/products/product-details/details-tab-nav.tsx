import { Product } from '@/common/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { ReviewForm } from './review-form';
import { ReviewItem } from './review-item';

type DetailsTabNavProps = {
  product: Product;
};

export const DetailsTabNav = ({ product }: DetailsTabNavProps) => {
  const renderReviews = useMemo(() => {
    if (product?.reviews?.length > 0) {
      return product?.reviews?.map((item) => (
        <ReviewItem key={item.id} review={item} />
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
      <Tabs
        defaultValue="description"
        className="my-12 flex w-full flex-col items-center justify-center "
      >
        <TabsList className="my-8 w-1/2 gap-12 rounded-none  border-b border-gray-300 bg-transparent text-gray-600">
          <TabsTrigger className="" value="description">
            Description
          </TabsTrigger>
          <TabsTrigger value="information">Additional information</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({product?.reviews?.length})
          </TabsTrigger>
        </TabsList>
        <motion.div className="w-full" layout layoutId="tabLayout">
          <TabsContent value="description" className="text-base text-gray-700">
            {product.description}
          </TabsContent>
        </motion.div>
        <motion.div layout layoutId="tabLayout">
          <TabsContent value="information">teste</TabsContent>
        </motion.div>
        <motion.div className="w-full" layout layoutId="tabLayout">
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
                <ReviewForm id={product.id} />
              </div>
            </div>
          </TabsContent>
        </motion.div>
      </Tabs>
    </AnimatePresence>
  );
};
