'use client';

import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartProduct {
  id: string;
  discount: number;
  title: string;
  price: number;
  orderQuantity: number;
  media: string;
}

interface CartStore {
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
  removeProduct: (id: string) => void;
  removeAll: () => void;
  getTotal: () => { total: number; quantity: number };
  getQuantity: (id: string) => number;
  addQuantity: (id: string) => void;
  removeQuantity: (id: string) => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      products: [],
      addProduct: (product: CartProduct) => {
        const currentProducts = get().products;
        const existingProduct = currentProducts.find(
          (currentProduct) => currentProduct.id === product.id
        );

        if (existingProduct) {
          return toast('Item already in cart.');
        }

        set({ products: [...get().products, product] });
        toast('Item added to cart.');
      },
      removeProduct: (id: string) => {
        set({
          products: [...get().products.filter((product) => product.id !== id)],
        });
        toast('Item removed from cart.');
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
      },

      removeQuantity: (id: string) => {
        set({
          products: [
            ...get().products.map((product) => {
              if (product.id === id) {
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
      },
      getTotal: () => {
        return get().products.reduce(
          (cartTotal, cartItem) => {
            const { price, orderQuantity } = cartItem;
            cartTotal.total += price * orderQuantity;
            cartTotal.quantity = get().products.length;
            return cartTotal;
          },
          { total: 0, quantity: 0 }
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
