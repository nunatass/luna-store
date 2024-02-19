'use client';

import { Header } from '@/components/layouts/headers/header';
import { CollectionsProductsArea } from '@/components/layouts/pages/collections/collections-products-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCollectionById } from '@/hooks/api/use-collections';

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { data: collection } = useCollectionById(params?.id);

  return (
    <Wrapper className="bg-white">
      <SEO pageTitle="Product Details" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title={collection?.title} disableSecondary />
      </div>
      <CollectionsProductsArea collectionId={params?.id} />
    </Wrapper>
  );
}
