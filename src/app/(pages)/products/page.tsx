import { Header } from '@/components/layouts/headers/header';
import { ProductsArea } from '@/components/layouts/pages/products/products-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function ProductsPage() {
  return (
    <Wrapper className="bg-white">
      <SEO pageTitle="Products" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Products" />
      </div>
      <ProductsArea />
    </Wrapper>
  );
}
