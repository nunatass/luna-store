import { Header } from '@/components/layouts/headers/header';
import { DiscountProductsArea } from '@/components/layouts/pages/discounts/discount-products-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function ProductPage() {
  return (
    <Wrapper className="bg-white">
      <SEO
        pageTitle="discounts"
        description="Explore unbeatable savings on our discount page! Discover exclusive deals, limited-time offers, and incredible discounts on a wide range of products."
        image="1a18b1bf-d78d-48e0-ba7d-92ea42aba859"
      />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Save 30%" disableSecondary />
      </div>
      <DiscountProductsArea discount={30} />
    </Wrapper>
  );
}
