import { OrderArea } from '@/components/layouts/order/order-area';
import { Wrapper } from '@/components/layouts/wrapper';

export const metadata = {
  title: 'Order Success | Stella Stone',
  description:
    'Congratulations on your successful order! Your purchase is confirmed, and excitement awaits. Sit back and anticipate your delivery as we prepare your items with care.',
};

export default function OrderPage() {
  return (
    <Wrapper>
      <OrderArea />
    </Wrapper>
  );
}
