import { useToastController } from '@tamagui/toast';

import { Button } from '../ui/button';

import { trpc } from '@/lib/trpc';

interface Props {
  userId: number;
}

export const ProfileAction = ({ userId }: Props) => {
  const toast = useToastController();
  const { mutate, isLoading } = trpc.user.relations.follow.useMutation();

  const handlePress = () => {
    mutate(
      { userId },
      {
        onError: (error) => {
          toast.show(error.message, {
            variant: 'error',
          });
        },
        onSuccess: (data) => {
          // update the get call
          console.log(data);
        },
      }
    );
  };

  return (
    <Button py="$3" variant="contained" onPress={handlePress} disabled={isLoading}>
      Follow
    </Button>
  );
};
