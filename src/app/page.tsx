import { Header } from '@/components/layouts/headers/header';
import { FeatureArea } from '@/components/layouts/pages/home/feature-area';
import HomeReviewArea from '@/components/layouts/pages/home/home-review-area';
import { JewelryBanner } from '@/components/layouts/pages/home/jewelry-banner';
import { PopularProducts } from '@/components/layouts/pages/home/products/popular-products';
import { ProductsArea } from '@/components/layouts/pages/home/products/products-area';
import { WaterProofHomeArea } from '@/components/layouts/pages/home/water-proof-home-area';
import { WaterProofSlider } from '@/components/layouts/water-proof-slider';

import { Wrapper } from '@/components/layouts/wrapper';

export default function HomePage() {
  return (
    <Wrapper className="bg-white">
      <Header />
      <JewelryBanner />
      <FeatureArea />
      <PopularProducts />
      <div className="-mb-10 -mt-20">
        <WaterProofSlider />
      </div>
      <WaterProofHomeArea />
      <ProductsArea />
      <HomeReviewArea />
    </Wrapper>
  );
}
