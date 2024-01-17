'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { productData } from '@/data/product-data';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { ProductSliderItem } from './product-slider-item';

// internal
//import { useGetProductTypeQuery } from '@/redux/features/productApi';
//import ProductSliderItem from './product-slider-item';
//import ErrorMsg from '@/components/common/error-msg';
//import { HomeTwoPopularPrdLoader } from '@/components/loader';

// const sliderSetting = {
//   modules: [Scrollbar],
//   slidesPerView: 1,
//   spaceBetween: 25,
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     576: {
//       slidesPerView: 2,
//     },
//     992: {
//       slidesPerView: 3,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1200: {
//       slidesPerView: 4,
//     },
//     1400: {
//       slidesPerView: 5,
//     },
//   },
// };

export const PopularProducts = () => {
  const carouselPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const products = productData;

  // const { data: products, isError, isLoading } =
  //   useGetProductTypeQuery({ type: 'jewelry', query: `new=true` });
  // decide what to render
  let content = null;

  // if (isLoading) {
  //   content = (
  //     <HomeTwoPopularPrdLoader loading={isLoading} />
  //   );
  // }
  // if (!isLoading && isError) {
  //   content = <ErrorMsg msg="There was an error" />;
  // }
  // if (!isLoading && !isError && products?.data?.length === 0) {
  //   content = <ErrorMsg msg="No Products found!" />;
  // }
  if (/*!isLoading && !isError &&*/ products?.data?.length > 0) {
    const product_items = products.data.slice(0, 8);

    content = (
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[carouselPlugin.current]}
        onMouseEnter={carouselPlugin.current.stop}
        onMouseLeave={carouselPlugin.current.reset}
        className="w-full"
      >
        <CarouselContent className="w-full ml-1">
          {product_items.map((item) => (
            <CarouselItem key={item._id} className="basis-auto pr-1">
              <ProductSliderItem {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }
  return (
    <section className="py-28 my-14 w-full bg-gray-100 flex flex-col gap-16">
      <div className="text-center flex flex-col gap-2">
        <span className="text-[#bd844c]">Shop by Category</span>
        <h3 className="text-4xl sm:text-5xl font-medium">
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
