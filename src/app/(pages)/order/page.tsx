import { OrderArea } from '@/components/layouts/order/order-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';

export default function OrderPage() {
  return (
    <Wrapper>
      <SEO pageTitle="Order Success" />
      <OrderArea />
    </Wrapper>
  );
}
