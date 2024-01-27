import { create } from 'zustand';

interface FilterStore {
  isFilterPanelOpen: boolean;
  filterPrice: number;
  filterCategory: string | null;
  setIsFilterPanelOpen: (value: boolean) => void;
  setPrice: (value: number) => void;
  setCategory: (category: string) => void;
  resetFilter: () => void;
}

export const useFilter = create<FilterStore>()((set) => ({
  isFilterPanelOpen: false,
  filterPrice: 11999,
  filterCategory: null,
  setIsFilterPanelOpen: (value) => set(() => ({ isFilterPanelOpen: value })),
  setPrice: (price) => set(() => ({ filterPrice: price })),
  setCategory: (category) => set(() => ({ filterCategory: category })),
  resetFilter: () => {
    set(() => ({
      filterPrice: 11999,
      filterCategory: null,
    }));
  },
}));
