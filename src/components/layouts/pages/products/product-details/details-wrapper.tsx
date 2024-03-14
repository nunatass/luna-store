'use client';
import { AskQuestionIcon, CartIcon, RulerIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { ProductQuantity } from './product-quantity';
import { ProductVariantSelect } from './product-variant-select';

import paymentOptionImg from '@/assets/img/footer/payments-icons.svg';
import { Price, Product, Variant } from '@/common/types';
import { useCart } from '@/hooks/use-cart';
import { CheckCircle } from 'lucide-react';
import { PriceBundle } from './price-bundle';

type DetailsWrapperProps = {
  product: Product;
};

export const DetailsWrapper = ({ product }: DetailsWrapperProps) => {
  const { addProduct: addCartProduct } = useCart();

  const [showMoreText, setShowMoreText] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<Price>(product.prices[0]);
  const [variant, setVariant] = useState<Variant>(product.variants[0]);

  const handleAddProduct = useCallback(() => {
    addCartProduct({
      id: product.id,
      discount: price.discount,
      price: price.value,
      media: product.medias[0].url,
      title: product.title,
      orderQuantity: quantity,
      variant,
    });
  }, [quantity, product, addCartProduct, price, variant]);

  const handleSelectPrice = useCallback(
    (price: Price) => {
      setPrice(price);
    },
    [setPrice]
  );

  return (
    <div className="flex w-full flex-col gap-4 text-gray-600">
      <div className="">
        <h3 className="text-2xl font-medium  text-black">{product.title}</h3>
      </div>

      <p className="text-md w-full whitespace-pre-line text-wrap break-words font-inter">
        {showMoreText
          ? product.description
          : `${product.description.substring(0, 100)}...`}
        <span
          className="ml-2 cursor-pointer text-black"
          onClick={() => setShowMoreText(!showMoreText)}
        >
          {showMoreText ? 'See less' : 'See more'}
        </span>
      </p>

      <PriceBundle
        prices={product.prices}
        onSelectChange={handleSelectPrice}
        selectedPrice={price}
      />

      <div className="flex flex-col gap-2">
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
              onSelectChange={(value) => setVariant(value)}
              variants={product?.variants}
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
        <Button variant="ghost" type="button" asChild>
          <Link href="/contact" className="flex gap-2" aria-label="contact">
            <AskQuestionIcon />
            Ask a question
          </Link>
        </Button>
      </div>

      <div className="">
        <div className="flex items-center gap-2 ">
          <CheckCircle className="h-4 w-4 text-gray-400" /> 30 days easy returns
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-gray-400" />
          Order yours before 2.30pm for same day dispatch
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
