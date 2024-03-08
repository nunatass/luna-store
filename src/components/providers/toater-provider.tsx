'use client';

import { useWindowSize } from '@/hooks/use-window-size';
import { ReactNode } from 'react';

type ToasterProviderProps = {
  children: ReactNode;
};

export const ToasterProvider = ({ children }: ToasterProviderProps) => {
  const { width } = useWindowSize();

  if (width < 720) {
    return null;
  }

  return children;
};
