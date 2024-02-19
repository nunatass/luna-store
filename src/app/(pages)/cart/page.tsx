import { Header } from '@/components/layouts/headers/header';
import { CartArea } from '@/components/layouts/pages/cart/cart-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function CartPage() {
  return (
    <Wrapper>
      <SEO pageTitle="Shipping Cart" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Shopping Cart" label="Shopping Cart" />
      </div>
      <CartArea />
    </Wrapper>
  );
}