'use client';

import { Header } from '@/components/layouts/headers/header';
import { ProductDetailsArea } from '@/components/layouts/pages/products/product-details/product-details-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useProductById } from '@/hooks/api/use-product';

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { data: product, isPending, isError } = useProductById(params.id);

  let content = null;

  if (isPending) {
    return null;
  }
  if (!isPending && isError) {
    return null;
  }
  if (!isPending && !isError && product) {
    content = <ProductDetailsArea productItem={product} />;
  }
  return (
    <Wrapper>
      <SEO pageTitle="Product details" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title={product.title} label={product?.category.name} />
      </div>
      {content}
    </Wrapper>
  );
}
