import { Header } from '@/components/layouts/headers/header';
import { TrackOrderArea } from '@/components/layouts/pages/track-order/track-order-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function FAQsPage() {
  return (
    <Wrapper>
      <SEO pageTitle="Track Your Order" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Track Your Order" />
      </div>
      <TrackOrderArea />
    </Wrapper>
  );
}
