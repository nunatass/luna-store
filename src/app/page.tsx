import { JewelryBanner } from '@/components/layout/banners/jewelry/jewelry-banner';
import { Header } from '@/components/layout/headers/header';
import Wrapper from '@/components/layout/wrapper';
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
