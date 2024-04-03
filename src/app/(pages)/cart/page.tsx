import { Header } from '@/components/layouts/headers/header';
import { CartArea } from '@/components/layouts/pages/cart/cart-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'Cart | Stella Stone',
};

export default function CartPage() {
  return (
    <Wrapper>
      <Header secondary />
      <div className="mt-36">
        <Breadcrumb title="Shopping Cart" label="Shopping Cart" />
      </div>
      <CartArea />
    </Wrapper>
  );
}
