import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useUnlikeComment = () => {
  const { mutate: unlike } = trpc.activity.comments.unlike.useMutation();
  const toast = useToastController();

  const likeComment = (commentId: number, options?: Parameters<typeof unlike>['1']) => {
    unlike(
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
