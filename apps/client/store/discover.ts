import { create } from 'zustand';

type DiscoverState = {
  isSearchFocused: boolean;
  focusSearch: () => void;
  blurSearch: () => void;
};

export const discoverStore = create<DiscoverState>((set) => ({
  isSearchFocused: false,
  focusSearch: () => set({ isSearchFocused: true }),
  blurSearch: () => set({ isSearchFocused: false }),
}));
