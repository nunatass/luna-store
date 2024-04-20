import { CartProduct } from '@/common/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replaceDashWithSpaces(array: string[]) {
  return array.map((string) => string.replace(/-/g, ' '));
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2);
}

export function formatPriceWithDiscount(
  priceInCents: number,
  discount: number
): { price: string; diference: string } {
  return {
    price: formatPrice((priceInCents * (100 - discount)) / 100),
    diference: formatPrice(
      priceInCents - (priceInCents * (100 - discount)) / 100
    ),
  };
}

export function generateRandomColor(colors: string[]): string {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function stringToId(input: string): string {
  return input.toLowerCase().replace(/\s+/g, '-');
}

export function idToString(id: string): string {
  return id.replace(/-/g, ' ');
}

export function findGiftProducts(products: CartProduct[]) {
  const totalProducts = products.reduce(
    (total, product) => total + product.orderQuantity,
    0
  );
  const giftAmount = Math.floor(totalProducts / 3);

  if (totalProducts <= 0 || giftAmount < 0) {
    return products;
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
      return sortedProducts;
    }
  }

  return sortedProducts;
}
