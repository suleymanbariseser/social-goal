import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useCreateComment = () => {
  const { mutate: create, isLoading } = trpc.activity.comments.create.useMutation();
  const toast = useToastController();

  const createComment = async (
    params: Parameters<typeof create>['0'],
    options?: Parameters<typeof create>['1']
  ) =>
    create(params, {
      onError: (error) => {
        toast.show(error.message, {
          variant: 'error',
        });
      },
      ...options,
    });

  return [createComment, { isLoading }] as const;
};
