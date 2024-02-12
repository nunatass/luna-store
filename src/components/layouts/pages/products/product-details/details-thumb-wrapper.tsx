'use client';
import { Media } from '@/common/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useState } from 'react';

type DetailsThumbWrapperProps = {
  imageURLs: Media[];
  imgWidth?: number;
  imgHeight?: number;
  modal?: boolean;
};

const imageTransitionAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: {
    duration: 0.4,
    ease: 'easeInOut',
  },
};

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const DetailsThumbWrapper = ({
  imageURLs,
  imgWidth = 416,
  imgHeight = 480,
  modal,
  // videoId = false,
  // status,
}: DetailsThumbWrapperProps) => {
  // const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeImg, setActiveImg] = useState<Media>(imageURLs[0]);

  // handle image active
  const handleImageActive = useCallback(
    (item: Media) => {
      setActiveImg(item);
    },
    [setActiveImg]
  );

  return (
    <>
      <div
        className={cn(
          'flex h-max w-full flex-col-reverse justify-center gap-4 md:justify-start lg:flex-row',
          modal && 'flex flex-row'
        )}
      >
        <nav className={cn('flex gap-2 lg:flex-col', modal && 'flex flex-col')}>
          {imageURLs?.map((item) => (
            <Button
              variant="ghost"
              key={item.id}
              className={cn(
                'h-[100px] w-[78px] bg-gray-100 p-0 transition-all duration-300 ease-in-out',
                item.id === activeImg.id && 'ring-[1.5px] ring-[#be844c]'
              )}
              onClick={() => handleImageActive(item)}
            >
              <Image
                src={`${imageUrlPrefix}/${item.url}`}
                alt="image"
                width={78}
                height={100}
                style={{ width: '100%', height: '100%' }}
                priority
              />
            </Button>
          ))}
        </nav>
        <div
          className={cn(
            'flex items-center justify-center bg-gray-100',
            !modal &&
              'w-full sm:h-[500px] sm:w-[85%] md:w-[50vw] lg:h-[600px] lg:w-[500px] xl:w-[580px]',
            modal && 'h-[500px] w-full'
          )}
        >
          <motion.div
            key={activeImg.id}
            {...imageTransitionAnimation}
            className="h-full w-full "
          >
            <Image
              src={`${imageUrlPrefix}/${activeImg.url}`}
              alt="product img"
              width={imgWidth}
              height={imgHeight}
              className="h-full w-full object-contain"
              priority
            />
            {/* <div className="tp-product-badge">
            {status === 'out-of-stock' && (
              <span className="product-hot">out-stock</span>
            )}
          </div> */}
            {/* {videoId && (
            <div
               onClick={() => setIsVideoOpen(true)}
              className="tp-product-details-thumb-video"
            >
              <a className="tp-product-details-thumb-video-btn popup-video cursor-pointer">
                <i className="fas fa-play"></i>
              </a>
            </div>
          )} */}
          </motion.div>
        </div>
      </div>
      {/* modal popup start */}
      {/* {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )} */}
      {/* modal popup end */}
    </>
  );
};
