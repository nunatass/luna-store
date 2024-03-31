import { Header } from '@/components/layouts/headers/header';
import { DiscountProductsArea } from '@/components/layouts/pages/discounts/discount-products-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

const discount = Number(process.env.NEXT_PUBLIC_DISCOUNT) || 20;
export const metadata = {
  title: 'Discounts | Stella Stone',
  description:
    'Explore unbeatable savings on our discount page! Discover exclusive deals, limited-time offers, and incredible discounts on a wide range of products.',
  openGraph: {
    images: [
      'https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/1a18b1bf-d78d-48e0-ba7d-92ea42aba859',
    ],
  },
};

export default function ProductPage() {
  return (
    <Wrapper className="bg-white">
      <Header secondary />
      <div className="mt-36">
        <Breadcrumb title="Products on Sale" disableSecondary />
      </div>
      <DiscountProductsArea discount={discount} />
    </Wrapper>
  );
}
