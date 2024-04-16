import { create } from 'zustand';

type DiscoverState = {
  isSearchFocused: boolean;
  search: string;
  focusSearch: () => void;
  blurSearch: () => void;
  updateSearch: (value: string) => void;
};

export const discoverStore = create<DiscoverState>((set) => ({
  search: '',
  isSearchFocused: false,
  focusSearch: () => set({ isSearchFocused: true }),
  blurSearch: () => set({ isSearchFocused: false }),
  updateSearch: (value) => set({ search: value }),
}));
