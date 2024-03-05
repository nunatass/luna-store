import { Category } from '@/common/types';
import { create } from 'zustand';

interface FilterStore {
  isFilterPanelOpen: boolean;
  filterPrice: number;
  filterCategory: Category | null;
  setIsFilterPanelOpen: (value: boolean) => void;
  setPrice: (value: number) => void;
  setCategory: (category: Category | null) => void;
  resetFilter: () => void;
}

export const useFilter = create<FilterStore>()((set) => ({
  isFilterPanelOpen: false,
  filterPrice: 200,
  filterCategory: null,
  setIsFilterPanelOpen: (value) => set(() => ({ isFilterPanelOpen: value })),
  setPrice: (price) => set(() => ({ filterPrice: price })),
  setCategory: (category: Category | null) =>
    set(() => ({ filterCategory: category })),
  resetFilter: () => {
    set(() => ({
      filterPrice: 200,
      filterCategory: null,
    }));
  },
}));
