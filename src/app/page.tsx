import { Header } from '@/components/layouts/headers/header';
import { FeatureArea } from '@/components/layouts/pages/home/feature-area';
import HomeReviewArea from '@/components/layouts/pages/home/home-review-area';
import { JewelryBanner } from '@/components/layouts/pages/home/jewelry-banner';
import { PopularProducts } from '@/components/layouts/pages/home/products/popular-products';
import { ProductsArea } from '@/components/layouts/pages/home/products/products-area';

import { Wrapper } from '@/components/layouts/wrapper';

export default function HomePage() {
  return (
    <Wrapper className="bg-white">
      <Header />
      <JewelryBanner />
      <FeatureArea />
      <PopularProducts />
      <ProductsArea />
      <HomeReviewArea />
    </Wrapper>
  );
}
