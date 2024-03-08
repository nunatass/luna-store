import { Product } from '@/common/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductReviewsArea } from './product-reviews-area';

type DetailsTabNavProps = {
  product: Product;
};

export const DetailsTabNav = ({ product }: DetailsTabNavProps) => {
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
          <TabsTrigger value="reviews"></TabsTrigger>
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
            <ProductReviewsArea productId={product.id} />
          </TabsContent>
        </motion.div>
      </Tabs>
    </AnimatePresence>
  );
};
