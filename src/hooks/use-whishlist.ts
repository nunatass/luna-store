'use client';

import { CartProduct } from '@/common/types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface WishStore {
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
  removeProduct: (id: string) => void;
  removeAll: () => void;
}

export const useWishlist = create(
  persist<WishStore>(
    (set, get) => ({
      products: [],
      addProduct: (product: CartProduct) => {
        const currentProducts = get().products;
        const existingProduct = currentProducts.find(
          (currentProduct) => currentProduct.id === product.id
        );

        if (existingProduct && existingProduct.price === product.price) {
          return toast('Item already in wishlist.');
        }

        set({
          products: [
            ...get().products.filter(
              (currentProduct) => currentProduct.id !== product.id
            ),
            product,
          ],
        });
        toast('Item added to wishlist.');
      },
      removeProduct: (id: string) => {
        set({
          products: [...get().products.filter((product) => product.id !== id)],
        });
        toast('Item removed from wishlist.');
      },
      removeAll: () => set({ products: [] }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
