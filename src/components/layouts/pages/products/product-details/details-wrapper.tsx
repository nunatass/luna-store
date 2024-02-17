'use client';
import { AskQuestionIcon, WishlistIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { ProductQuantity } from './product-quantity';

import paymentOptionImg from '@/assets/img/footer/payments-icons.svg';
import { Price, Product } from '@/common/types';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-whishlist';
import { CheckCircle } from 'lucide-react';
import { PriceBundle } from './price-bundle';

type DetailsWrapperProps = {
  product: Product;
};

export const DetailsWrapper = ({ product }: DetailsWrapperProps) => {
  const { addProduct: addCartProduct } = useCart();
  const { addProduct: addWishlistProduct } = useWishlist();

  const [ratingVal] = useState(0);
  const [showMoreText, setShowMoreText] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<Price>(product.prices[0]);

  const handleAddProduct = useCallback(() => {
    addCartProduct({
      id: product.id,
      discount: price.discount,
      price: price.value,
      media: product.medias[0].url,
      title: product.title,
      orderQuantity: quantity,
    });
  }, [quantity, product, addCartProduct, price]);

  const handleSelectPrice = useCallback(
    (price: Price) => {
      setPrice(price);
    },
    [setPrice]
  );

  // useEffect(() => {
  //   if (reviews && reviews.length > 0) {
  //     const rating =
  //       reviews.reduce((acc, review) => acc + review.rating, 0) /
  //       reviews.length;
  //     setRatingVal(rating);
  //   } else {
  //     setRatingVal(0);
  //   }
  // }, [reviews]);

  // handle wishlist product
  const handleWishlistProduct = useCallback(() => {
    addWishlistProduct({
      id: product.id,
      discount: price.discount,
      price: price.value,
      media: product.medias[0].url,
      title: product.title,
      orderQuantity: quantity,
    });
  }, [quantity, product, addWishlistProduct, price]);

  return (
    <div className="flex w-full flex-col gap-4 text-gray-600">
      <div className="">
        <span className="text-base font-normal ">{product.category.name}</span>
        <h3 className="text-3xl font-medium text-black">{product.title}</h3>
      </div>

      <div className="flex items-center gap-2">
        <Rating
          allowFraction
          size={16}
          initialValue={ratingVal}
          readonly={true}
          className="flex"
        />

        <span className="text-sm">
          {/* (
          {product.reviews && product.reviews.length > 0
            ? product.reviews.length
            : 0}{' '}
          Review) */}
        </span>
      </div>

      <p className="text-md">
        {showMoreText
          ? product.description
          : `${product.description.substring(0, 100)}...`}
        <span
          className="text-[#be844c]"
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

      {/* variations */}
      {/* {imageURLs.some((item) => item?.color && item?.color?.name) && (
        <div className="tp-product-details-variation">
          <h4 className="tp-product-details-variation-title">Color :</h4>
          <div className="tp-product-details-variation-list">
            {imageURLs.map((item, i) => (
              <button
                // onClick={() => handleImageActive(item)}
                key={i}
                type="button"
                className={''}
              >
                <span
                  data-bg-color={`${item?.color.clrCode}`}
                  style={{ backgroundColor: `${item?.color.clrCode}` }}
                ></span>
                {item?.color && item?.color.name && (
                  <span className="tp-color-variation-tootltip">
                    {item?.color.name}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )} */}

      {/* if ProductDetailsCountdown true start */}
      {/* {offerDate?.endDate && (
        // <ProductDetailsCountdown offerExpiryTime={offerDate?.endDate} />
      )} */}
      {/* if ProductDetailsCountdown true end */}

      <div className="flex flex-col gap-4">
        <h3 className="text-base text-black">Quantity</h3>
        <div className="flex gap-4">
          <ProductQuantity setQuantity={setQuantity} quantity={quantity} />
          <Button
            variant="outline"
            onClick={handleAddProduct}
            size="lg"
            className="w-full"
          >
            Add To Cart
          </Button>
        </div>

        <Button asChild size="lg" className="w-full">
          <Link href="/cart">Buy Now</Link>
        </Button>
      </div>

      <div className="flex border-b-[1px] pb-2">
        <Button
          variant="ghost"
          onClick={handleWishlistProduct}
          type="button"
          className="flex gap-2"
        >
          <WishlistIcon />
          Add Wishlist
        </Button>
        <Button variant="ghost" type="button" asChild>
          <Link href="/contact" className="flex gap-2">
            <AskQuestionIcon />
            Ask a question
          </Link>
        </Button>
      </div>

      <div className="hidden w-full flex-col gap-2 lg:flex">
        <div className="">
          <div className="flex items-center gap-2 ">
            <CheckCircle className="h-4 w-4 text-gray-400" /> 30 days easy
            returns
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-gray-400" />
            Order yours before 2.30pm for same day dispatch
          </div>
        </div>

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
