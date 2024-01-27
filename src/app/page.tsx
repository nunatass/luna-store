import { JewelryBanner } from '@/components/layouts/banners/jewelry/jewelry-banner';
import { ShopBanner } from '@/components/layouts/banners/shop/shop-banner';
import { Header } from '@/components/layouts/headers/header';
import { FeatureArea } from '@/components/layouts/pages/home/feature-area';
import { InstagramArea } from '@/components/layouts/pages/home/instagram-area';
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
      <ShopBanner />
      <PopularProducts />
      <ProductsArea />
      <InstagramArea />
    </Wrapper>
  );
}
