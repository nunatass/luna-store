import { Header } from '@/components/layouts/headers/header';
import { TrackOrderArea } from '@/components/layouts/pages/track-order/track-order-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'Track Your Order | Stella Stone',
  description: `Stay informed every step of the way with our easy-to-use order tracking page. Monitor your package's journey from checkout to delivery, ensuring peace of mind with real-time updates.`,
};

export default function FAQsPage() {
  return (
    <Wrapper>
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Track Your Order" />
      </div>
      <TrackOrderArea />
    </Wrapper>
  );
}
