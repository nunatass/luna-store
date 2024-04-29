"use client"

import {
  RaindropsIcon,
  RingsWeddingIcon,
  SunIcon,
  SurgicalIcon,
} from '@/components/icons';
import Slider from 'react-infinite-logo-slider';

export function WaterProofSlider() {
  return (
    <div className="">
      <Slider
        width="400px"
        duration={20}
        pauseOnHover={true}
        blurBorders={false}
        className="border-0"
      >
        <Slider.Slide className=" flex h-20 items-center justify-center gap-2 border-2 border-[#dff8ef] bg-[#dff8ef] font-semibold text-black">
          <div className="flex items-center gap-2 text-wrap">
            <RaindropsIcon className="h-6 w-6 shrink-0" />
            <span className="text-sm md:text-base">
              Resistant to water, sweat & perfume
            </span>
          </div>
        </Slider.Slide>
        <Slider.Slide className=" flex h-20 items-center justify-center gap-2 border-2 border-[#dff8ef] bg-[#dff8ef] font-semibold text-black">
          <div className="flex items-center gap-2">
            <RingsWeddingIcon className="h-6 w-6 shrink-0" />
            <span className="text-sm md:text-base">10x more durable</span>
          </div>
        </Slider.Slide>
        <Slider.Slide className=" flex h-20 items-center justify-center gap-2 border-2 border-[#dff8ef] bg-[#dff8ef] font-semibold text-black">
          <div className="flex items-center gap-2">
            <SunIcon className="h-6 w-6 shrink-0" />
            <span className="text-sm md:text-base">
              Does not fade & tarnish
            </span>
          </div>
        </Slider.Slide>
        <Slider.Slide className=" flex h-20 items-center justify-center gap-2 border-2 border-[#dff8ef] bg-[#dff8ef] font-semibold text-black">
          <div className="flex items-center gap-2">
            <SurgicalIcon className="h-6 w-6 shrink-0" />
            <span className="text-sm md:text-base">
              Surgical steel - 100% hypoallergenic
            </span>
          </div>
        </Slider.Slide>
      </Slider>
    </div>
  );
}
