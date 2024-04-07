'use client';

import { Product, Variant } from '@/common/types';
import { CartIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useCurrency } from '@/hooks/use-currency';
import { useSticky } from '@/hooks/use-sticky';
import { useWindowSize } from '@/hooks/use-window-size';
import { cn, formatPriceWithDiscount } from '@/lib/utils';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { ProductAddToCartWithSelectVariant } from './product-add-to-cart-with-select-variant';
import { ProductVariantSelect } from './product-variant-select';

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

type ProductAddToCartProps = {
  productItem: Product;
};

export function ProductAddToCart({ productItem }: ProductAddToCartProps) {
  const { position } = useSticky();
  const { height, width } = useWindowSize();
  const { symbol } = useCurrency();
  const { addProduct: addCartProduct, setSideCartOpen } = useCart();
  const [variant, setVariant] = useState<Variant | undefined>();
  const [showVariantDisclaimer, setShowVariantDisclaimer] = useState(false);
  const [isMobileAddToCartOpen, setIsMobileAddToCartOpen] = useState(false);

  const handleAddProduct = useCallback(() => {
    if (
      (productItem?.variants.length > 0 && variant) ||
      productItem?.variants.length === 0
    ) {
      addCartProduct({
        id: productItem.id,
        discount: productItem.prices[0].discount,
        price: productItem.prices[0].value,
        media: productItem.medias[0].url,
        title: productItem.title,
        orderQuantity: 1,
        variant,
        giftAmount: 0,
      });
      setSideCartOpen(true);
    } else {
      setShowVariantDisclaimer(true);
    }
  }, [
    addCartProduct,
    productItem,
    setShowVariantDisclaimer,
    setSideCartOpen,
    variant,
  ]);

  const handleAddProductMobile = useCallback(() => {
    if (productItem?.variants.length > 0) {
      setIsMobileAddToCartOpen(true);
    } else {
      addCartProduct({
        id: productItem.id,
        discount: productItem.prices[0].discount,
        price: productItem.prices[0].value,
        media: productItem.medias[0].url,
        title: productItem.title,
        orderQuantity: 1,
        variant,
        giftAmount: 0,
      });
      setSideCartOpen(true);
    }
  }, [
    addCartProduct,
    productItem,
    setIsMobileAddToCartOpen,
    setSideCartOpen,
    variant,
  ]);

  return (
    <div
      className={cn(
        'fixed -bottom-16 left-0 right-0 z-[30] flex  h-16 w-full flex-col justify-end bg-white shadow-md',
        width > 720 && position > height / 2 && 'bottom-0',
        width < 720 && position > 1.5 * height && 'bottom-0'
      )}
    >
      <div className="hidden h-full w-full items-center justify-between px-8  sm:flex">
        <div className="flex w-full gap-2">
          <div>
            <Image
              alt={productItem.title}
              src={`${imageUrlPrefix}/${productItem.medias[1].url}`}
              width={50}
              height={50}
            />
          </div>
          <div className=" flex flex-col justify-center">
            <p className="text-sm font-medium">{productItem.title}</p>
            <span className="text-left text-sm">
              {symbol}
              {
                formatPriceWithDiscount(
                  productItem.prices[0].value,
                  productItem.prices[0].discount
                ).price
              }
            </span>
          </div>
        </div>

        <div className="flex w-full justify-end gap-4">
          {productItem?.variants.length > 0 && (
            <ProductVariantSelect
              className="w-40"
              onSelectChange={(value) => {
                setVariant(value);
                setShowVariantDisclaimer(false);
              }}
              errorMessage
              variants={productItem?.variants}
              showSelectError={showVariantDisclaimer}
            />
          )}
          <Button
            onClick={handleAddProduct}
            size="lg"
            className="flex w-40 gap-2"
          >
            <CartIcon /> Add To Cart
          </Button>
        </div>
      </div>

      <div className="relative flex flex-col gap-2 sm:hidden">
        <Button
          onClick={handleAddProductMobile}
          size="lg"
          className="flex h-16 w-full gap-2"
        >
          <CartIcon /> Add To Cart
        </Button>
      </div>
      <ProductAddToCartWithSelectVariant
        isOpen={isMobileAddToCartOpen}
        setIsOpen={setIsMobileAddToCartOpen}
        productItem={productItem}
      />
    </div>
  );
}
