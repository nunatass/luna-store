'use client';

import paymentOptionImg from '@/assets/img/footer/payments-icons.svg';
import { Price, Product, Variant } from '@/common/types';
import {
  AskQuestionIcon,
  CartIcon,
  RaindropsIcon,
  RingsWeddingIcon,
  RulerIcon,
  SunIcon,
} from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useCurrency } from '@/hooks/use-currency';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { PriceBundle } from './price-bundle';
import { ProductQuantity } from './product-quantity';
import { ProductVariantSelect } from './product-variant-select';

type DetailsWrapperProps = {
  product: Product;
};

const freeShippingThreshold =
  Number(process.env.NEXT_PUBLIC_SHIPPING_THRESHOLD) || 6000;

export const DetailsWrapper = ({ product }: DetailsWrapperProps) => {
  const { addProduct: addCartProduct } = useCart();
  const { symbol } = useCurrency();

  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<Price>(product.prices[0]);
  const [variant, setVariant] = useState<Variant | undefined>(undefined);
  const [showVariantDisclaimer, setShowVariantDisclaimer] = useState(false);

  const handleAddProduct = useCallback(() => {
    if (
      (product?.variants.length > 0 && variant) ||
      product?.variants.length === 0
    ) {
      addCartProduct({
        id: product.id,
        discount: price.discount,
        price: price.value,
        media: product.medias[0].url,
        title: product.title,
        orderQuantity: quantity,
        variant,
      });
    } else {
      setShowVariantDisclaimer(true);
    }
  }, [
    quantity,
    product,
    addCartProduct,
    price,
    variant,
    setShowVariantDisclaimer,
  ]);

  const handleSelectPrice = useCallback(
    (price: Price) => {
      setPrice(price);
    },
    [setPrice]
  );

  return (
    <div className="flex w-full flex-col gap-4 text-gray-800">
      <div className="-mb-2">
        <h3 className="text-2xl font-medium  text-black">{product.title}</h3>
      </div>

      <PriceBundle
        prices={product.prices}
        onSelectChange={handleSelectPrice}
        selectedPrice={price}
      />

      <div className="flex items-center justify-between border-b border-gray-200 pb-4 text-[10px] font-bold text-gray-700 md:text-[12px]">
        <div className="flex max-w-40 items-center gap-2 text-wrap">
          <RaindropsIcon className="h-6 w-6 shrink-0" />
          <span>Resistant to water, sweat & perfume</span>
        </div>
        <div className="flex max-w-40 items-center gap-2">
          <RingsWeddingIcon className="h-6 w-6 shrink-0" />
          <span>10x more durable</span>
        </div>
        <div className="flex max-w-40 items-center gap-2 lg:mr-8">
          <SunIcon className="h-6 w-6 shrink-0" />
          <span>Does not fade & tarnish</span>
        </div>
      </div>

      <p className="w-full whitespace-pre-line text-wrap break-words font-inter text-sm">
        {product.description}
      </p>

      <div className="flex flex-col gap-2 border-t border-gray-200 pt-2">
        <div className="flex w-full items-end justify-between">
          <h3 className="text-base text-black">Quantity</h3>
          {product?.variants.length > 0 && (
            <Button variant="ghost" className="h-auto items-end p-1" asChild>
              <Link
                href="/size-guide"
                className="flex h-auto items-end gap-2 p-1 text-base text-black"
              >
                <RulerIcon />
                Size guide
              </Link>
            </Button>
          )}
        </div>
        <div className="flex gap-4">
          <ProductQuantity setQuantity={setQuantity} quantity={quantity} />
          {product?.variants.length > 0 && (
            <ProductVariantSelect
              onSelectChange={(value) => {
                setVariant(value);
                setShowVariantDisclaimer(false);
              }}
              variants={product?.variants}
              showSelectError={showVariantDisclaimer}
            />
          )}
          {product?.variants.length === 0 && (
            <Button
              variant="outline"
              onClick={handleAddProduct}
              size="lg"
              className="flex w-full gap-2"
            >
              <CartIcon /> Add To Cart
            </Button>
          )}
        </div>
        {product?.variants.length > 0 && (
          <Button
            variant="outline"
            onClick={handleAddProduct}
            size="lg"
            className="flex w-full gap-2"
          >
            <CartIcon /> Add To Cart
          </Button>
        )}
      </div>

      <div className="flex border-b-[1px] pb-2">
        <Button variant="ghost" type="button" asChild className="text-sm">
          <Link href="/contact" className="flex gap-2" aria-label="contact">
            <AskQuestionIcon />
            Ask a question
          </Link>
        </Button>
      </div>

      <div className="">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-gray-400" /> 30 days easy returns
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-gray-400" />
          {`Free standard delivery on purchases of +${symbol}${freeShippingThreshold / 100}`}
        </div>
      </div>

      <div className="hidden w-full flex-col gap-2 lg:flex">
        <div className="flex w-full flex-wrap items-center justify-center gap-4 bg-gray-200 p-3">
          <div className="flex gap-2 sm:flex-col sm:gap-0 md:flex-row md:gap-2 xl:flex-col xl:gap-0">
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
  );
};
