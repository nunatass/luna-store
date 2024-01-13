import { useWindowSize } from '@/hooks/use-window-size';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import SlickSlider from 'react-slick';
import { CircleBG } from './circle-bg';

//  slider setting
const mainSliderSetting = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  centerMode: false,
};

const imageAnimationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const textAnimationVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: -20 },
};

const getImageAnimationProps = (index: number, currentSlide: number) => {
  return {
    variants: imageAnimationVariants,
    initial: 'hidden',
    animate: index === currentSlide ? 'visible' : 'hidden',
    exit: 'hidden',
    transition: {
      duration: 1,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.6,
    },
  };
};

const getTextAnimationProps = (
  index: number,
  currentSlide: number,
  delay = 0.6
) => {
  return {
    variants: textAnimationVariants,
    initial: 'hidden',
    animate: index === currentSlide ? 'visible' : 'hidden',
    exit: 'hidden',
    transition: {
      duration: 0.4,
      ease: [0.45, 0, 0.55, 1],
      delay,
    },
  };
};

type SliderData = {
  subtitle: string;
  title: string;
  img: StaticImageData;
};

type SliderProps = {
  data: SliderData[];
  setSlider: (slider: SlickSlider | undefined) => void;
  currentSlide: number;
  asNavFor: SlickSlider | undefined;
};

export function Slider({
  data,
  currentSlide,
  setSlider,
  asNavFor,
}: SliderProps) {
  const { width } = useWindowSize();
  return (
    <SlickSlider
      {...mainSliderSetting}
      asNavFor={asNavFor}
      ref={(slider) => setSlider(slider!)}
      className="h-[90vh] sm:min-h-[110vh]"
    >
      {data.map((item, index) => (
        <div
          key={item.title}
          className="relative bottom-0 h-[90vh] sm:min-h-[110vh] "
        >
          <motion.div
            key={index}
            {...getImageAnimationProps(index, currentSlide)}
            className={cn(
              'absolute bottom-0 z-30 aspect-auto h-screen w-full object-contain flex justify-center items-end sm:translate-y-0 md:translate-y-16 sm:pl-56',
              width > 400 && 'translate-y-10',
              width > 480 && 'translate-y-40',
              width > 580 && 'translate-y-56'
            )}
          >
            <Image src={item.img} alt="slider img" />
          </motion.div>
          <CircleBG index={index} currentSlide={currentSlide} />

          <div className="absolute left-0 top-[55%] sm:top-[35%] md:top-[30%] z-40 p-8 md:left-10 lg:left-[12%] lg:w-[700px] md:w-[500px]">
            <div className="flex flex-col text-white">
              <motion.span
                {...getTextAnimationProps(index, currentSlide, 0.3)}
                className="text-3xl sm:text-5xl  font-charm"
                key={`${index} subtitle`}
              >
                {item.subtitle}
              </motion.span>
              <motion.h3
                className="text-5xl sm:text-7xl md:text-[72px] lg:text-[96px] text-wrap"
                {...getTextAnimationProps(index, currentSlide)}
                key={`${index} title`}
              >
                {item.title}
              </motion.h3>
              <motion.div
                className="mt-8 sm:mt-4 w-max border-2 border-[#b7a687] px-6 py-3 transition-colors ease-in-out duration-300 hover:border-white hover:bg-white hover:text-black md:mt-8"
                {...getTextAnimationProps(index, currentSlide, 0.8)}
                key="shop-btn"
              >
                <Link href="/shop">Discover Now</Link>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </SlickSlider>
  );
}
