import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useFollow = () => {
  const toast = useToastController();
  const { mutate: _follow } = trpc.user.relations.follow.useMutation();

  const follow = (id: number, options: Parameters<typeof _follow>['1']) => {
    _follow(
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

  return follow;
};
