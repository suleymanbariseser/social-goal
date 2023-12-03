import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

type Options = {
  id: number;
};

export const useLikeActivity = ({ id }: Options) => {
  const { mutate: like } = trpc.activity.likes.likeById.useMutation();
  const toast = useToastController();

  const likeActivity = async () =>
    like(
      { id },
      {
        onSuccess: () => {
          // TODO sync state and show like animation
        },
        onError: (error) => {
          toast.show(error.message, {
            variant: 'error',
          });
        },
      }
    );

  return likeActivity;
};
