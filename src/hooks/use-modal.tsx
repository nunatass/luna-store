import { ReactNode } from 'react';

import { create } from 'zustand';

interface ModalStore {
  isOpen: boolean;
  children: ReactNode | null;
  setIsOpen: (value: boolean) => void;
  setChildren: (value: ReactNode) => void;
}

export const useModal = create<ModalStore>()((set) => ({
  isOpen: false,
  children: null,
  setIsOpen: (value) => set(() => ({ isOpen: value })),
  setChildren: (value) => set(() => ({ children: value })),
}));
