import { create } from 'zustand';

import { storageAtom } from '@/lib/storage';

export const authTokenState = storageAtom<string>('auth_token', true);

type AuthStoreToken = {
  emailToken: string | undefined;
  updateEmailToken: (newToken: string) => void;
};

export const authStore = create<AuthStoreToken>((set) => ({
  emailToken: undefined,
  updateEmailToken: (newToken: string) =>
    set({
      emailToken: newToken,
    }),
}));
