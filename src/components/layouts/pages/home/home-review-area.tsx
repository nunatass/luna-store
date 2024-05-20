'use client';

import { ReviewItem } from '@/components/layouts/pages/products/product-details/review-item';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { homeReviews } from '@/data/home-reviews-data';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRef } from 'react';
export default function HomeReviewArea() {
  const carouselPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col">
      <div className=" relative h-96 w-full duration-700  ease-in-out hover:scale-[1.02] md:h-[600px]">
        <Image
          className="object-cover"
          unoptimized
          fill
          alt="footer banner"
          src="/banner-footer.webp"
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center text-xs text-white sm:text-xl">
          <p>FROM BEACH DAYS TO DATE NIGHT,</p>
          <p className="text-xs lowercase sm:text-sm">
            OUR JEWELRY WON&apos;T LET YOU DOWN.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center gap-4 bg-[#f8f7f3] py-12">
        <div className="flex w-full flex-col items-center px-4">
          <Image
            alt="trustpilot"
            width={500}
            height={50}
            src="/trustpilot-header.webp"
          />
          <p className="pb-4 text-lg">Join 150 000+ Happy Customers</p>
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[carouselPlugin.current]}
            onMouseEnter={carouselPlugin.current.stop}
            onMouseLeave={carouselPlugin.current.reset}
          >
            <CarouselContent>
              {homeReviews.map((review) => (
                <CarouselItem
                  className="basis-1/1 md:w-md w-full md:basis-1/2 lg:w-full lg:basis-1/3"
                  key={review.id}
                >
                  <ReviewItem review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
