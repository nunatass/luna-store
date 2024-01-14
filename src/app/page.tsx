import { JewelryBanner } from '@/components/layouts/banners/jewelry/jewelry-banner';
import { ShopBanner } from '@/components/layouts/banners/shop/shop-banner';
import { Header } from '@/components/layouts/headers/header';
import { FeatureArea } from '@/components/layouts/pages/home/feature-area';

import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header />
      <JewelryBanner />
      <FeatureArea />
      <ShopBanner />
    </Wrapper>
  );
}
