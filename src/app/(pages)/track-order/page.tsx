import bannerTop from '@/assets/img/banner-top.webp';
import { Header } from '@/components/layouts/headers/header';
import { TrackOrderArea } from '@/components/layouts/pages/track-order/track-order-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import Image from 'next/image';

export default function FAQsPage() {
  return (
    <Wrapper>
      <SEO
        pageTitle="Track Your Order"
        description={`Stay informed every step of the way with our easy-to-use order tracking page. Monitor your package's journey from checkout to delivery, ensuring peace of mind with real-time updates.`}
      />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Track Your Order" />
      </div>
      <TrackOrderArea />
      <div className="relative h-80 w-full">
        <Image src={bannerTop} fill alt="banner top" className="object-cover" />
      </div>
    </Wrapper>
  );
}
