import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useLikeComment = () => {
  const { mutate: like } = trpc.activity.comments.like.useMutation();
  const toast = useToastController();

  const likeComment = (commentId: number, options?: Parameters<typeof like>['1']) => {
    like(
      { commentId },
      {
        onError: (error) => {
          toast.show(error.message, {
            variant: 'error',
          });
        },
        ...options,
      }
    );
  };

  return likeComment;
};
