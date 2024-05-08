import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useUnlike = () => {
  const { mutate: unlike } = trpc.activity.likes.unlikeById.useMutation();
  const toast = useToastController();

  const likeActivity = async (id: number, options?: Parameters<typeof unlike>['1']) =>
    unlike(
      { id },
      {
        onError: (error) => {
          toast.show(error.message, {
            variant: 'error',
          });
        },
        ...options,
      }
    );

  return likeActivity;
};
