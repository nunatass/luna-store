'use client';
import faqImg from '@/assets/img/banner-faq.webp';

import paymentOptionImg from '@/assets/img/footer/payments-icons.svg';
import { Product } from '@/common/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqsData } from '@/data/faqs-data';
import Image from 'next/image';
import { DetailsThumbWrapper } from './details-thumb-wrapper';
import { DetailsWaterProof } from './details-water-proof';
import { DetailsWrapper } from './details-wrapper';
import { ProductAddToCart } from './product-add-to-cart';
import { ProductRecommendations } from './product-recommendations';
import { ProductReviewsArea } from './product-reviews-area';

type ProductDetailsAreaProps = {
  productItem: Product;
};

export const ProductDetailsArea = ({
  productItem,
}: ProductDetailsAreaProps) => {
  return (
    <section className="relative pb-20 pt-8">
      <div className="container">
        <div className="flex flex-col gap-14 md:flex-row xl:gap-20">
          <DetailsThumbWrapper
            imageURLs={productItem.medias}
            imgWidth={580}
            imgHeight={670}
          />
          <DetailsWrapper product={productItem} />
        </div>
        <div className="lg:w-1/1 mt-4 flex w-full flex-col gap-4 md:items-end lg:hidden">
          <div className="flex w-full flex-col items-center justify-between gap-4 bg-gray-200 p-3 sm:flex-row sm:justify-between">
            <div className="flex flex-col gap-0 text-sm sm:text-base">
              <span>Guaranteed safe </span>
              <span>& secure checkout</span>
            </div>
            <Image
              src={paymentOptionImg}
              alt="payment_option_img"
              className="h-8 w-max"
            />
          </div>
        </div>
      </div>

      {productItem.recommendations &&
        productItem.recommendations.length > 0 && (
          <div className="bg-white py-5">
            <div className="container">
              <ProductRecommendations
                recommendations={productItem.recommendations}
              />
            </div>
          </div>
        )}

      <DetailsWaterProof />

      <div className="my-8 flex w-full flex-col md:flex-row container md:gap-20">
        <div className="h-full w-full">
          <Image
            src={faqImg}
            alt="faq img"
            width={500}
            height={500}
            className="h-[200px] w-full object-cover md:h-[400px]"
          />
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqsData.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-sm md:text-base">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="whitespace-pre-line	 text-sm">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="my-8">
        <ProductReviewsArea productId={productItem.id} />
      </div>
      <ProductAddToCart productItem={productItem} />
    </section>
  );
};
