import { create } from "zustand";

interface CategoryState {
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  clearCategories: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategories: [],

  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  clearCategories: () => set({ selectedCategories: [] }),
}));
