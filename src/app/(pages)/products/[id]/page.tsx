'use client';

import { Header } from '@/components/layouts/headers/header';
import { ProductDetailsAreaLoading } from '@/components/layouts/loadings/pages/products/product-details-area-loading';
import { ProductDetailsArea } from '@/components/layouts/pages/products/product-details/product-details-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useProductByTitle } from '@/hooks/api/use-product';
import { idToString } from '@/lib/utils';
import { notFound } from 'next/navigation';

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const {
    data: product,
    isPending,
    isError,
  } = useProductByTitle(idToString(params.id));

  let content = null;

  if (isPending) {
    content = <ProductDetailsAreaLoading />;
  }

  if (!isPending && isError) {
    return notFound();
  }
  if (!isPending && !isError && product) {
    content = <ProductDetailsArea productItem={product} />;
  }
  return (
    <Wrapper>
      <Header secondary />
      <div className="mt-36">
        <Breadcrumb label={product?.category.name || ' '} />
      </div>
      <div className="min-h-[60vh]">{content}</div>
    </Wrapper>
  );
}
