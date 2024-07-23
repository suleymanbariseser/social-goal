import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useDeleteRecentSearch = () => {
  const toast = useToastController();
  const utils = trpc.useUtils();
  const { mutate: deleteRecentSearch } = trpc.discover.recentSearches.delete.useMutation();

  const handleDelete = (id: number) => {
    const item = utils.discover.recentSearches.list.getData()?.find((item) => item.id === id);

    // apply optimistic update
    utils.discover.recentSearches.list.setData(undefined, (data) => {
      return data.filter((item) => item.id !== id);
    });

    deleteRecentSearch(
      { id },
      {
        onSuccess: () => {},
        onError: (err) => {
          // revert optimistic update
          utils.discover.recentSearches.list.setData(undefined, (data) => {
            return [...data, item];
          });
          toast.show(err.message, {
            variant: 'error',
          });
        },
      }
    );
  };

  return handleDelete;
};
