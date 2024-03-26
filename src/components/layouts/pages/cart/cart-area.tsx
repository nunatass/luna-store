'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { CartProduct } from '@/common/types';
import { CloseTwoIcon } from '@/components/icons';
import { useCurrency } from '@/hooks/use-currency';
import { formatPrice, formatPriceWithDiscount, stringToId } from '@/lib/utils';
import { ProductQuantity } from '../products/product-details/product-quantity';
import { CartCheckout } from './components/cart-checkout';
import { columns } from './components/cart-table/columns';
import { CartDataTable } from './components/cart-table/data-table';

const itemProductAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    type: 'spring',
    bounce: 0.25,
    duration: 0.5,
  },
  layout: true,
};

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const CartArea = () => {
  const { symbol } = useCurrency();
  const { removeAll, removeProduct, products, addQuantity, removeQuantity } =
    useCart();

  const handleClearProducts = () => {
    removeAll();
  };

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
  };

  const renderEmptyDiv = () => (
    <motion.div {...itemProductAnimationProps} key="empty-div" />
  );

  const renderProductItem = (product: CartProduct) => (
    <motion.div
      {...itemProductAnimationProps}
      className="relative flex w-full items-start gap-2 py-4"
    >
      <div className="border-[1px] border-gray-200">
        <Link
          href={`/products/${stringToId(product.title)}`}
          aria-label="product link"
        >
          <Image
            src={`${imageUrlPrefix}/${product.media}`}
            width={70}
            height={60}
            alt="product img"
            className="h-20 w-24"
          />
        </Link>
      </div>
      <div className="w-full">
        <h2 className="font-semibold transition-all duration-300 ease-in-out ">
          <Link
            className="text-sm"
            href={`/products/${stringToId(product.title)}`}
            aria-label={product.title}
          >
            {product.title}
          </Link>
        </h2>
        <div className="w-full">
          {product.discount > 0 ? (
            <div className="flex w-full items-center gap-2">
              <span className="text-left text-sm">
                {symbol}
                {
                  formatPriceWithDiscount(
                    product.price * product.orderQuantity,
                    product.discount
                  ).price
                }
              </span>

              <span className="text-right text-sm text-gray-600  line-through">
                {symbol}
                {formatPrice(product.price * product.orderQuantity)}
              </span>
            </div>
          ) : (
            <span className="text-sm font-semibold">
              {symbol}
              {formatPrice(product.price * product.orderQuantity)}
            </span>
          )}
          <div className="flex w-full items-end justify-between">
            <span className="-mt-2 text-[12px] text-gray-700">
              {product?.variant?.label}
            </span>
            <ProductQuantity
              className="mt-1.5 h-8 w-20"
              setQuantity={(value) => {
                if (value > product.orderQuantity) {
                  addQuantity(product.id);
                } else {
                  removeQuantity(product.id);
                }
              }}
              quantity={product.orderQuantity}
            />
          </div>
        </div>
      </div>
      <Button
        onClick={() => handleRemoveProduct(product.id)}
        variant="link"
        size="icon"
        className="absolute right-0 top-2 py-0 text-gray-600"
      >
        <CloseTwoIcon />
      </Button>
    </motion.div>
  );

  const renderProductItems = () => (
    <div className="flex w-full flex-col divide-y-[1px]">
      {products.map((product, index) => (
        <AnimatePresence key={`${product.id}-${index}`} initial>
          {index === products.length
            ? renderEmptyDiv()
            : renderProductItem(product)}
        </AnimatePresence>
      ))}
      <div />
    </div>
  );

  return (
    <section className="container min-h-[70vh] items-center justify-center pb-20 pt-8">
      {products.length === 0 && (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-6 text-center">
          <h3 className="text-lg font-bold md:text-3xl">Your cart is empty</h3>
          <Button asChild>
            <Link href="/products" aria-label="shop">
              Continue Shipping
            </Link>
          </Button>
        </div>
      )}

      {products.length > 0 && (
        <div className="flex h-full w-full flex-col items-start gap-8 lg:flex-row">
          <div className="flex w-full flex-col gap-4">
            <div className="hidden sm:block">
              <CartDataTable columns={columns} data={products} />
            </div>
            <div className="sm:hidden">{renderProductItems()}</div>
            <div>
              <div className="col-xl-6 col-md-8"></div>
              <div className="flex w-full justify-end">
                <Button
                  variant="outline"
                  onClick={handleClearProducts}
                  type="button"
                  className="tp-cart-update-btn"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          <CartCheckout />
        </div>
      )}
    </section>
  );
};
