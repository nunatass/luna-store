'use client';

import { Button } from '@/components/ui/button';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export const JewelryBanner = () => {
  return (
    <div className=" relative h-screen w-screen overflow-hidden">
      <section className="relative h-full w-full bg-[#AB9774] bg-[url('/banner.jpeg')] bg-cover bg-center bg-no-repeat">
        <div className="button absolute left-1/2 top-1/2 z-10  flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 text-white">
          <div className="flex flex-col items-center text-center">
            <div className="md:text-md text-[13px] font-light text-white">
              ★★★★★ LOVED BY 150,000+ CLIENTS
            </div>
          </div>
          <h2 className="my-8 text-center font-americana text-5xl font-bold md:text-7xl">
            Buy 2, Get 1 Free!
          </h2>
          <div className="text-[13px] font-light text-white md:text-base">
            Be You WEARING US.
          </div>
          <div className="">
            <Button
              className="mt-4 bg-white px-12 text-sm text-black hover:bg-black hover:text-white"
              asChild
            >
              <AnchorLink href="#products">SHOP NOW</AnchorLink>
            </Button>
          </div>
          <div className="h-0 w-0 opacity-0">
            <h1>Stella Stone</h1>
            <h3>Stella Stone Jewelry</h3>
          </div>
        </div>
      </section>
    </div>
  );
};
