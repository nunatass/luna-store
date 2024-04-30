'use client';

import { Header } from '@/components/layouts/headers/header';
import { CollectionsProductsArea } from '@/components/layouts/pages/collections/collections-products-area';
import HomeReviewArea from '@/components/layouts/pages/home/home-review-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { collectionsBanner } from '@/data/collections-banner-data';
import { useCollectionById } from '@/hooks/api/use-collections';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { data: collection } = useCollectionById(params?.id);

  return (
    <Wrapper className="bg-white">
      <Header secondary />
      <div className="container relative mt-20 pt-8">
        {collection?.title && (
          <Image
            src={collectionsBanner[collection?.title].image}
            alt="menu popular"
            width={350}
            height={300}
            className="mt-8 h-[300px] w-full object-cover"
            unoptimized
          />
        )}
        <div
          className={cn(
            'absolute -left-2 bottom-6 ml-8 flex flex-col gap-4 text-white sm:left-6',
            collection?.title === 'Silver Collection' && 'text-black'
          )}
        >
          <h1
            className="text-3xl font-medium md:text-4xl"
            aria-label="stella stone store collections"
          >
            {collection?.title}
          </h1>
          {collection?.title && (
            <p className="max-w-[400px] text-xs sm:text-sm">
              {collectionsBanner[collection?.title].description || ''}
            </p>
          )}
        </div>
      </div>
      <CollectionsProductsArea collectionId={params?.id} />
      <HomeReviewArea />
    </Wrapper>
  );
}
