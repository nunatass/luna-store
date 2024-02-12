'use client';
import { Collection } from '@/common/types';
import { PopularProductsLoading } from '@/components/layouts/loadings/pages/home/popular-products-loading';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useCollections } from '@/hooks/api/use-collections';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { ProductSliderItem } from './product-slider-item';

export const PopularProducts = () => {
  const carouselPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const { data: collections, isPending, isError } = useCollections();

  let content = null;

  if (isPending) {
    content = <PopularProductsLoading />;
  }

  if (isError) {
    return null;
  }

  const popularProductsCollection: Collection | undefined = collections.find(
    (collection) => collection.title === 'Popular Products'
  );

  if (!isPending && !isError && !popularProductsCollection) {
    return null;
  }

  if (
    !isPending &&
    !isError &&
    popularProductsCollection &&
    popularProductsCollection.products.length > 0
  ) {
    const products = popularProductsCollection.products;
    content = (
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[carouselPlugin.current]}
        onMouseEnter={carouselPlugin.current.stop}
        onMouseLeave={carouselPlugin.current.reset}
        className="w-full"
      >
        <CarouselContent className="ml-1 w-full">
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-auto pr-1">
              <ProductSliderItem product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }
  return (
    <section className="my-14 flex w-full flex-col gap-12 bg-gray-100 py-28">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-[#bd844c]">Product Collection</span>
        <h3 className="text-3xl font-medium sm:text-5xl">
          Popular on the Luna store.
        </h3>
      </div>

      <div className="w-full">
        {content}
        <div className="" />
      </div>
    </section>
  );
};
