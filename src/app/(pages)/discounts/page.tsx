import { Header } from '@/components/layouts/headers/header';
import { DiscountProductsArea } from '@/components/layouts/pages/discounts/discount-products-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function ProductPage() {
  return (
    <Wrapper className="bg-white">
      <SEO pageTitle="Product Details" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Save 30%" disableSecondary />
      </div>
      <DiscountProductsArea discount={30} />
    </Wrapper>
  );
}
