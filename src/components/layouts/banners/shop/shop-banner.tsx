import Link from 'next/link';
// internal
import banner_bg_1 from '@/assets/img/banner/4/banner-1.jpg';
import banner_bg_2 from '@/assets/img/banner/4/banner-2.jpg';
import banner_bg_3 from '@/assets/img/banner/4/banner-3.jpg';
import banner_bg_4 from '@/assets/img/banner/4/banner-4.jpg';
import { ArrowRightLongIcon } from '@/components/icons';
import { BannerItem } from './components/shop-banner-item';

export const ShopBanner = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
        <div className="sm:col-span-2 md:row-start-1">
          <BannerItem
            className="md:h-full"
            backgroundColor="#F3F7FF"
            image={banner_bg_1}
            contentType="Collection"
            title={`Tropical Set`}
            isClicable
          />
        </div>
        <div>
          <BannerItem
            className="md:h-full"
            backgroundColor="#F0F6EF"
            image={banner_bg_2}
            contentType="Trending"
            title="Summer Set"
          />
        </div>
        <div>
          <BannerItem
            className="md:h-full"
            backgroundColor="#F8F1E6"
            image={banner_bg_3}
            contentType="New Arrival"
            title="Gold Jewelry"
          />
        </div>
        <div className="relative mt-6 flex h-[470px] w-full justify-between overflow-hidden bg-black px-14 py-14 sm:col-span-2 sm:h-[494px] md:col-span-2 md:row-span-2 md:row-start-1 md:mr-6 md:mt-0 md:h-[600px]">
          <div
            className="absolute left-0 top-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-300 ease-in-out hover:scale-110"
            style={{ backgroundImage: `url(${banner_bg_4.src})` }}
          />
          <div className="z-10 flex w-max flex-col justify-end text-white ">
            <span className="text-base">Collection</span>
            <h3 className="text-4xl">
              <Link href="/shop">
                Ring gold with <br /> diamonds
              </Link>
            </h3>
            <div className="mt-8 flex w-max items-center justify-center px-6 py-1.5 text-white ring-2 ring-gray-200/40 transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:ring-white">
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2"
              >
                Shop Now <ArrowRightLongIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
