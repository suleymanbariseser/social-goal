import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useClearRecentSearch = () => {
  const utils = trpc.useUtils();
  const toast = useToastController();
  const { mutate: clearRecentSearch } = trpc.discover.recentSearches.clear.useMutation();

  const handleClear = () => {
    const data = utils.discover.recentSearches.list.getData();

    utils.discover.recentSearches.list.setData(undefined, []);

    clearRecentSearch(undefined, {
      onError: (err) => {
        utils.discover.recentSearches.list.setData(undefined, () => {
          return data;
        });
        toast.show(err.message, {
          variant: 'error',
        });
      },
    });
  };

  return handleClear;
};
