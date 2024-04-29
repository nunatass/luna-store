import { WaterProofSlider } from '@/components/layouts/water-proof-slider';

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
          without worry, whether it`s for a swim, in the gym or on the beach.
        </p>
        <div className="container flex w-full flex-col items-center px-4">
          <video
            autoPlay
            loop
            muted
            id="video"
            playsInline
            className="h-80 w-full object-cover"
          >
            <source src="/water-proof.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <WaterProofSlider />
    </>
  );
}
