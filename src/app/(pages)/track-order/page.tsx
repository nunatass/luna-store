import { Header } from '@/components/layouts/headers/header';
import { TrackOrderArea } from '@/components/layouts/pages/track-order/track-order-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import bannerTop from '@/assets/img/banner-top.webp';
import Image from 'next/image'

export default function FAQsPage() {
  return (
    <Wrapper>
      <SEO pageTitle="Track Your Order" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Track Your Order" />
      </div>
      <TrackOrderArea />
      <div className="relative w-full h-80">
       <Image src={bannerTop} fill alt="banner top" className="object-cover"/>
      </div>
    </Wrapper>
  );
}
