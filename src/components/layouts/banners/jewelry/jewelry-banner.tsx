'use client';

import { useState } from 'react';
import SlickSlider from 'react-slick';
// internal
import slider_img_1 from '@/assets/img/slider/4/slider-1.png';
import slider_img_2 from '@/assets/img/slider/4/slider-2.png';
import slider_img_3 from '@/assets/img/slider/4/slider-3.png';
import slider_img_4 from '@/assets/img/slider/4/slider-4.png';

// nav icon
import nav_icon_1 from '@/assets/img/slider/4/nav/icon-1.png';
import nav_icon_2 from '@/assets/img/slider/4/nav/icon-2.png';
import nav_icon_3 from '@/assets/img/slider/4/nav/icon-3.png';
import nav_icon_4 from '@/assets/img/slider/4/nav/icon-4.png';
import { cn } from '@/lib/utils';
import { NavButtons } from './components/nav-buttons';
import { Slider } from './components/slider';
import { SliderNav } from './components/slider-nav';

// slider data
const sliderData = [
  { subtitle: 'The original', title: 'Shine bright', img: slider_img_1 },
  { subtitle: 'The original', title: 'Creative Design', img: slider_img_2 },
  { subtitle: 'The original', title: 'Gold Plateted', img: slider_img_3 },
  { subtitle: 'The original', title: 'Unique shapes', img: slider_img_4 },
];

// slider nav data
const sliderNavData = [
  {
    icon: nav_icon_1,
    title: 'Ring &\nEarring',
  },
  {
    icon: nav_icon_2,
    title: `Bangles &\nBracelets`,
  },
  {
    icon: nav_icon_3,
    title: 'Drop \nNecklaces',
  },
  {
    icon: nav_icon_4,
    title: 'Diamond \nNecklaces',
  },
];

export const JewelryBanner = () => {
  const [imageSlider, setSlider] = useState<SlickSlider | undefined>(undefined);
  const [navSlider, setNavSlider] = useState<SlickSlider | undefined>(
    undefined
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section
      className={cn(
        'relative h-[90vh] w-screen overflow-hidden bg-[#AB9774] sm:h-screen'
      )}
    >
      <Slider
        asNavFor={navSlider}
        setSlider={setSlider}
        currentSlide={currentSlide}
        data={sliderData}
      />
      <SliderNav
        data={sliderNavData}
        setSlider={setNavSlider}
        asNavFor={imageSlider}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      <NavButtons slider={imageSlider} />
    </section>
  );
};
