import { authTokenState } from 'store/auth';

import { useResetStorageItem, useStorageItemValue } from '@/lib/storage';
import { trpc } from '@/lib/trpc';

export const useAuth = () => {
  const authToken = useStorageItemValue(authTokenState);
  const resetAuthToken = useResetStorageItem(authTokenState);
  const { data: user, remove } = trpc.user.info.useQuery(undefined, {
    enabled: !!authToken,
  });

  const logout = () => {
    resetAuthToken();
    remove();
  };

  return { user, logout };
};
