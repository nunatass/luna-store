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
