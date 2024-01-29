import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useUnfollow = () => {
  const toast = useToastController();
  const { mutate: _unfollow } = trpc.user.relations.unfollow.useMutation();

  const unfollow = (id: number, options: Parameters<typeof _unfollow>['1']) => {
    _unfollow(
      {
        id,
      },
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

  return unfollow;
};
