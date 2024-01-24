'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCallback, useState } from 'react';
// import PopupVideo from "../common/popup-video";

type ImageItem = { img: string; size: number; id: string };
type DetailsThumbWrapperProps = {
  imageURLs: ImageItem[];
  imgWidth?: number;
  imgHeight?: number;
};

export const DetailsThumbWrapper = ({
  imageURLs,
  imgWidth = 416,
  imgHeight = 480,
  // videoId = false,
  // status,
}: DetailsThumbWrapperProps) => {
  // const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeImg, setActiveImg] = useState<ImageItem>(imageURLs[0]);

  // handle image active
  const handleImageActive = useCallback(
    (item: ImageItem) => {
      setActiveImg(item);
    },
    [setActiveImg]
  );

  return (
    <>
      <div className="flex h-max w-full flex-col-reverse justify-center gap-4 md:justify-start lg:flex-row">
        <nav className="flex gap-2 lg:flex-col">
          {imageURLs?.map((item) => (
            <Button
              variant="ghost"
              key={item.id}
              className={cn(
                'h-[100px] w-[78px] bg-gray-100 p-0',
                item.img === activeImg.img && 'ring-[1.5px] ring-[#be844c]'
              )}
              onClick={() => handleImageActive(item)}
            >
              <Image
                src={item.img}
                alt="image"
                width={78}
                height={100}
                style={{ width: '100%', height: '100%' }}
              />
            </Button>
          ))}
        </nav>

        <div className="w-full bg-gray-200 sm:h-[500px] sm:w-[85%] md:w-[50vw] lg:h-[600px] lg:w-[500px] xl:w-[580px]">
          <Image
            src={activeImg.img}
            alt="product img"
            width={imgWidth}
            height={imgHeight}
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
