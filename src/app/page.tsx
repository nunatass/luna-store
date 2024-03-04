import { Header } from '@/components/layouts/headers/header';
import { HomeCollectionsArea } from '@/components/layouts/pages/home/collections/home-collections-area';
import { FeatureArea } from '@/components/layouts/pages/home/feature-area';
import { JewelryBanner } from '@/components/layouts/pages/home/jewelry-banner';
import { PopularProducts } from '@/components/layouts/pages/home/products/popular-products';
import { ProductsArea } from '@/components/layouts/pages/home/products/products-area';

import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';

export default function HomePage() {
  return (
    <Wrapper className="bg-white">
      <SEO pageTitle="Home" />
      <Header />
      <JewelryBanner />
      <FeatureArea />
      <HomeCollectionsArea />
      <PopularProducts />
      <ProductsArea />
      {/* <InstagramArea /> */}
    </Wrapper>
  );
}
