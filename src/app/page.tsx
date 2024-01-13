import { JewelryBanner } from '@/components/layouts/banners/jewelry/jewelry-banner';
import { Header } from '@/components/layouts/headers/header';
import Wrapper from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header />
      <JewelryBanner />
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </Wrapper>
  );
}
