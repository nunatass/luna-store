import { OrderArea } from '@/components/layouts/order/order-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';

export default function OrderPage() {
  return (
    <Wrapper>
      <SEO
        pageTitle="Order Success"
        description='Congratulations on your successful order! Your purchase is confirmed, and excitement awaits. Sit back and anticipate your delivery as we prepare your items with care."'
      />
      <OrderArea />
    </Wrapper>
  );
}
