'use client';
import { AskQuestionIcon, WishlistIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { ProductQuantity } from './product-quantity';

import paymentOptionImg from '@/assets/img/footer/payments-icons.svg';
import { Product } from '@/common/types';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-whishlist';
import { CheckCircle } from 'lucide-react';

type DetailsWrapperProps = {
  productItem: Product;
};

export const DetailsWrapper = ({ productItem }: DetailsWrapperProps) => {
  const { addProduct: addCartProduct } = useCart();
  const { addProduct: addWishlistProduct } = useWishlist();

  const { title, category, description, discount, price, reviews } =
    productItem;
  const [ratingVal] = useState(0);
  const [showMoreText, setShowMoreText] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const renderPrice = useMemo(() => {
    if (discount > 0) {
      return (
        <>
          <span className="text-base	line-through">${price}</span>
          <span className="text-2xl font-medium text-black">
            $
            {(Number(price) - (Number(price) * Number(discount)) / 100).toFixed(
              2
            )}
          </span>
        </>
      );
    }

    return (
      <span className="text-2xl font-medium text-black">
        ${price.toFixed(2)}
      </span>
    );
  }, [price, discount]);

  const handleAddProduct = useCallback(() => {
    addCartProduct({ ...productItem, orderQuantity: quantity });
  }, [quantity, productItem, addCartProduct]);

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
    addWishlistProduct({ ...productItem, orderQuantity: quantity });
  }, [quantity, productItem, addCartProduct]);

  return (
    <div className="flex w-full flex-col gap-4 text-gray-600">
      <div className="">
        <span className="text-base font-normal ">{category.name}</span>
        <h3 className="text-3xl font-medium text-black">{title}</h3>
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
          ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
        </span>
      </div>

      <p className="text-md">
        {showMoreText ? description : `${description.substring(0, 100)}...`}
        <span
          className="text-[#be844c]"
          onClick={() => setShowMoreText(!showMoreText)}
        >
          {showMoreText ? 'See less' : 'See more'}
        </span>
      </p>

      <div className="flex items-center gap-2">{renderPrice}</div>

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
          <Link
            href="/cart"
            //  onClick={() => dispatch(handleModalClose())}
          >
            Buy Now
          </Link>
        </Button>
      </div>

      <div className="flex border-b-[1px] pb-2">
        <Button
          variant="ghost"
          onClick={() => handleWishlistProduct}
          type="button"
          className="flex gap-2"
        >
          <WishlistIcon />
          Add Wishlist
        </Button>
        <Button variant="ghost" type="button" className="flex gap-2">
          <AskQuestionIcon />
          Ask a question
        </Button>
      </div>

      <div className="">
        <ul>
          <li className="flex items-center gap-2 ">
            <CheckCircle className="h-4 w-4 text-gray-400" /> 30 days easy
            returns
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-gray-400" />
            Order yours before 2.30pm for same day dispatch
          </li>
        </ul>
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
  );
};
