import { Header } from '@/components/layouts/headers/header';
import { ProductDetailsAreaLoading } from '@/components/layouts/loadings/pages/products/product-details-area-loading';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function Loading() {
  return (
    <Wrapper>
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb label=" " />
      </div>
      <div className="min-h-[60vh]">
        <ProductDetailsAreaLoading />
      </div>
    </Wrapper>
  );
}
