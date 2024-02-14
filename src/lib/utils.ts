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
