import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useLike = () => {
  const { mutate: like } = trpc.activity.likes.likeById.useMutation();
  const toast = useToastController();

  const likeActivity = async (id: number, options?: Parameters<typeof like>['1']) =>
    like(
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
