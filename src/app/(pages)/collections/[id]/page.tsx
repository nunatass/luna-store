'use client';

import menuCharm from '@/assets/img/menu-charm.webp';
import menuPerl from '@/assets/img/menu-perl.webp';
import menuPopular from '@/assets/img/menu-popular.webp';
import menuSilver from '@/assets/img/menu-silver.webp';
import menuSun from '@/assets/img/menu-sun.webp';
import menuTwisted from '@/assets/img/menu-twisted.webp';

import { Header } from '@/components/layouts/headers/header';
import { CollectionsProductsArea } from '@/components/layouts/pages/collections/collections-products-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { useCollectionById } from '@/hooks/api/use-collections';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';

type ProductPageProps = {
  params: { id: string };
};

type CollectionItem = {
  description: string;
  image: StaticImageData;
};

type CollectionsBanner = {
  [collectionName: string]: CollectionItem;
};

const collectionsBanner: CollectionsBanner = {
  'Popular Products': {
    description:
      'Discover our most popular jewelery in our top list, where our beloved favorites have been collected, and be inspired by the best of our collections that follow the latest trends and timeless classics.',
    image: menuPopular,
  },
  'Pearls Collection': {
    description:
      'Explore the elegance and timeless beauty of our Pearls Collection, where each piece showcases the lustrous allure of pearls, adding a touch of sophistication and refinement to your jewelry ensemble.',
    image: menuPerl,
  },
  'Sunlight Collection': {
    description:
      "Let yourself be enchanted by our brilliant Sun collection, where the shining sun motif captures the essence of the sun's glow and spreads joy and warmth in your jewelery, creating a unique and beautiful expression.",
    image: menuSun,
  },
  'Silver Collection': {
    description:
      'Indulge in the brilliance of our Silver Collection, featuring stunning pieces crafted from sterling silver, each designed to exude elegance and style, making them perfect for both everyday wear and special occasions.',

    image: menuSilver,
  },
  'Twisted Collection': {
    description:
      'Twist collection Dive into our enchanting Twisted collection, where the artful and twisted design brings a sense of lightness and dynamism to your jewelery',
    image: menuTwisted,
  },
  'Charm Collection': {
    description:
      'Discover the whimsical and personalized charm of our Charm Collection, where each charm tells a unique story and allows you to express your individuality and creativity through your jewelry.',

    image: menuCharm,
  },
};

export default function ProductPage({ params }: ProductPageProps) {
  const { data: collection } = useCollectionById(params?.id);

  return (
    <Wrapper className="bg-white">
      <Header secondary />
      <div className="container relative mt-8 pt-8">
        {collection?.title && (
          <Image
            src={collectionsBanner[collection?.title].image}
            alt="menu popular"
            width={350}
            height={300}
            className="mt-8 h-[350px] w-full object-cover"
            unoptimized
          />
        )}
        <div
          className={cn(
            'absolute bottom-6 left-6 ml-8 flex flex-col gap-4 text-white',
            collection?.title === 'Silver Collection' && 'text-black'
          )}
        >
          <h1 className="text-3xl font-medium">{collection?.title}</h1>
          {collection?.title && (
            <p className="max-w-[400px] text-sm">
              {collectionsBanner[collection?.title].description || ''}
            </p>
          )}
        </div>
      </div>
      <CollectionsProductsArea collectionId={params?.id} />
    </Wrapper>
  );
}
