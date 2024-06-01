import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useDeleteComment = () => {
  const { mutate: _delete, isLoading } = trpc.activity.comments.delete.useMutation();
  const toast = useToastController();

  const deleteComment = (commentId: number, options?: Parameters<typeof _delete>['1']) => {
    _delete(
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

  return [deleteComment, { isLoading }] as const;
};
