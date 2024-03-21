'use client';
import { Product, Recommendation } from '@/common/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { ProductRecommendationItem } from './product-recommendation-item';

type ProductRecommendationsProps = {
  recommendations: Recommendation[];
};

export const ProductRecommendations = ({
  recommendations,
}: ProductRecommendationsProps) => {
  const carouselPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="my-14 flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-medium">Recommended for you</h3>
      </div>

      <div className="w-full">
        <Carousel
          opts={{ align: 'start', loop: true }}
          plugins={[carouselPlugin.current]}
          onMouseEnter={carouselPlugin.current.stop}
          onMouseLeave={carouselPlugin.current.reset}
          className="w-full"
        >
          <CarouselContent className="w-full">
            {recommendations.map((product) => (
              <CarouselItem key={product.id} className="basis-auto pr-1">
                <ProductRecommendationItem
                  product={
                    {
                      id: product.id,
                      title: product.title,
                      medias: product.medias,
                      prices: product.prices,
                    } as Product
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="hidden h-12 w-12 md:flex" />
          <CarouselNext className="hidden h-12 w-12 md:flex" /> */}
        </Carousel>
        <div className="" />
      </div>
    </section>
  );
};
