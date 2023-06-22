import { create } from 'zustand';

type RegisterStore = {
  token: string | undefined;
  updateToken: (token: string) => void;
  reset: () => void;
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  token: undefined,
  updateToken: (token: string) => set({ token }),
  reset: () => set({}, true),
}));
