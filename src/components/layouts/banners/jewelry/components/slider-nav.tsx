import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Slider from 'react-slick';

const navSliderSetting = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: true,
  dots: false,
  arrows: false,
  centerMode: false,
  focusOnSelect: true,
};

type SliderNavData = {
  title: string;
  icon: StaticImageData;
};

type SliderNavProps = {
  data: SliderNavData[];
  setSlider: (slider: Slider | undefined) => void;
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  asNavFor: Slider | undefined;
};

export function SliderNav({
  data,
  setSlider,
  currentSlide,
  setCurrentSlide,
  asNavFor,
}: SliderNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}
      className="absolute bottom-40 left-10 hidden h-32 w-40 sm:left-20 sm:block lg:left-60 xl:left-96 "
    >
      <Slider
        {...navSliderSetting}
        asNavFor={asNavFor}
        ref={(slider) => setSlider(slider!)}
        beforeChange={(_, next) => setCurrentSlide(next)}
        className="h-32 w-40 "
      >
        {data.map((item, index) => (
          <div key={index}>
            <div
              className={cn(
                'tp-slider-nav-icon flex cursor-pointer items-center justify-center gap-5 text-xl font-medium text-white transition-all duration-200 ease-in-out',
                index !== currentSlide && 'opacity-60'
              )}
            >
              <span>
                <Image src={item.icon} alt="icon" />
              </span>
              <span>
                <h3>{item.title}</h3>
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
}
