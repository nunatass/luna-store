import {
  RaindropsIcon,
  RingsWeddingIcon,
  SunIcon,
  SurgicalIcon,
} from '@/components/icons';
import Slider from 'react-infinite-logo-slider';
export function DetailsWaterProof() {
  return (
    <>
      <div className=" mb-8 flex w-full flex-col items-center justify-center gap-4 bg-[#f8f7f3] pt-12">
        <p className="max-w-md text-center text-2xl">
          Water and sweat resistant{' '}
          <span className="font-bold">Does not fade or tarnish.</span>
        </p>
        <p className=" w-full px-4 text-center text-sm sm:max-w-[500px]">
          The jewelery that can withstand water, sweat and perfume. They do not
          fade and retain the coating regardless of whether you choose 18K
          gold-plated or silver. The jewelery is specially designed to resist
          water and moisture, with its unique PVD coating, so you can wear them
          without worry, whether it&rsquos for a swim, in the gym or on the
          beach.
        </p>
        <div className="container flex w-full flex-col items-center px-4">
          <video
            autoPlay
            loop
            muted
            id="video"
            className="h-80 w-full object-cover"
          >
            <source src="/water-proof.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="">
        <Slider
          width="400px"
          duration={20}
          pauseOnHover={true}
          blurBorders={false}
          className="border-0"
        >
          <Slider.Slide className=" flex h-20 items-center justify-center gap-2 border-0 border-2 border-[#dff8ef] bg-[#dff8ef] font-semibold text-black">
            <div className="flex items-center gap-2 text-wrap">
              <RaindropsIcon className="h-6 w-6 shrink-0" />
              <span className="text-sm md:text-base">
                Resistant to water, sweat & perfume
              </span>
            </div>
          </Slider.Slide>
          <Slider.Slide className=" flex h-20 items-center justify-center gap-2 border-0 border-2 border-[#dff8ef] bg-[#dff8ef] font-semibold text-black">
            <div className="flex items-center gap-2">
              <RingsWeddingIcon className="h-6 w-6 shrink-0" />
              <span className="text-sm md:text-base">10x more durable</span>
            </div>
          </Slider.Slide>
          <Slider.Slide className=" flex h-20 items-center justify-center gap-2 border-0 border-2 border-[#dff8ef] bg-[#dff8ef] font-semibold text-black">
            <div className="flex items-center gap-2">
              <SunIcon className="h-6 w-6 shrink-0" />
              <span className="text-sm md:text-base">
                Does not fade & tarnish
              </span>
            </div>
          </Slider.Slide>
          <Slider.Slide className=" flex h-20 items-center justify-center gap-2 border-0 border-2 border-[#dff8ef] bg-[#dff8ef] font-semibold text-black">
            <div className="flex items-center gap-2">
              <SurgicalIcon className="h-6 w-6 shrink-0" />
              <span className="text-sm md:text-base">
                Surgical steel - 100% hypoallergenic
              </span>
            </div>
          </Slider.Slide>
        </Slider>
      </div>
    </>
  );
}
