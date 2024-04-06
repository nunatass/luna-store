'use client';

import { CartProduct, Variant } from '@/common/types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartStore {
  isSideCartOpen: boolean;
  setSideCartOpen: (value: boolean) => void;
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
  removeProduct: (id: string) => void;
  removeAll: () => void;
  getTotal: () => {
    total: number;
    quantity: number;
    totalWithDiscount: number;
  };
  getQuantity: (id: string) => number;
  addQuantity: (id: string) => void;
  removeQuantity: (id: string) => void;
  selectVariant: (id: string, variant: Variant) => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      products: [],
      isSideCartOpen: false,
      amountProduct: 0,
      setSideCartOpen: (isSideCartOpen: boolean) => {
        set({ isSideCartOpen });
      },
      addProduct: (product: CartProduct) => {
        const currentProducts = get().products;
        const existingProduct = currentProducts.find(
          (currentProduct) => currentProduct.id === product.id
        );

        if (existingProduct && existingProduct.price === product.price) {
          return toast('Item already in cart.');
        }

        set({
          products: [
            ...get().products.filter(
              (currentProduct) => currentProduct.id !== product.id
            ),
            product,
          ],
        });

        toast('Item added to cart.');
        findGiftProducts(get().products);
      },
      removeProduct: (id: string) => {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        set((state: any) => {
          const updatedProducts = state.products
            .map((product: CartProduct) => {
              if (product.id === id) {
                if (product.giftAmount && product.giftAmount > 0) {
                  const p = {
                    ...product,
                    orderQuantity: Math.max(0, product.orderQuantity - 1),
                    giftAmount: Math.max(0, product.giftAmount - 1),
                  };
                  if (p.orderQuantity === 0) {
                    return null;
                  }
                  return p;
                } else {
                  return null;
                }
              }
              return product;
            })
            .filter(Boolean);

          return {
            products: updatedProducts,
          };
        });

        toast('Item removed from cart.');
        findGiftProducts(get().products);
      },

      removeAll: () => set({ products: [] }),
      getQuantity: (id: string) => {
        const product = get().products.filter(
          (product) => product.id === id
        )[0];

        return product ? product.orderQuantity : 0;
      },
      addQuantity: (id: string) => {
        set({
          products: [
            ...get().products.map((product) => {
              if (product.id === id) {
                if (product.orderQuantity > 20) {
                  toast.error('Cant add more than 20');
                  return product;
                }
                product.orderQuantity++;
              }
              return product;
            }),
          ],
        });
        findGiftProducts(get().products);
      },

      removeQuantity: (id: string) => {
        set({
          products: [
            ...get().products.map((product) => {
              if (product.id === id) {
                if (product.orderQuantity > 0 && product.giftAmount! > 0) {
                  product.orderQuantity--;
                  return product;
                }
                if (product.orderQuantity < 2) {
                  toast.success('must have at lest one product');
                  return product;
                }
                product.orderQuantity--;
              }
              return product;
            }),
          ],
        });
        findGiftProducts(get().products);
      },
      selectVariant: (id: string, variant: Variant) => {
        set({
          products: [
            ...get().products.map((product) => {
              if (product.id === id) {
                product.variant = variant;
              }
              return product;
            }),
          ],
        });
      },
      getTotal: () => {
        return get().products.reduce(
          (cartTotal, cartItem) => {
            const { price, orderQuantity, giftAmount } = cartItem;
            cartTotal.total += price * (orderQuantity - giftAmount!);
            cartTotal.totalWithDiscount +=
              (price - (price * cartItem.discount) / 100) *
              (orderQuantity - giftAmount!);
            cartTotal.quantity = get().products.length;
            return cartTotal;
          },
          { total: 0, totalWithDiscount: 0, quantity: 0 }
        );
      },
    }),

    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function findGiftProducts(products: CartProduct[]) {
  const totalProducts = products.reduce(
    (total, product) => total + product.orderQuantity,
    0
  );
  const giftAmount = Math.floor(totalProducts / 3);

  if (totalProducts <= 0 || giftAmount < 0) {
    return;
  }

  const sortedProducts = products.sort(
    (a, b) =>
      (a.price * (100 - a.discount)) / 100 -
      (b.price * (100 - b.discount)) / 100
  );

  let remainingGiftAmount = giftAmount;

  for (const product of sortedProducts) {
    product.giftAmount = 0;
  }

  for (const product of sortedProducts) {
    product.giftAmount = 0;
    const increaseAmount = Math.min(remainingGiftAmount, product.orderQuantity);
    product.giftAmount = increaseAmount;
    remainingGiftAmount -= increaseAmount;

    if (remainingGiftAmount === 0) {
      break;
    }
  }
}
