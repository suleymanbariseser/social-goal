import { useToastController } from '@tamagui/toast';

import { Button } from '../ui/button';

import { trpc } from '@/lib/trpc';

interface Props {
  userId: number;
}

const FollowButton = ({ userId }: Props) => {
  const toast = useToastController();
  const [settings] = trpc.user.settings.useSuspenseQuery({ id: userId });
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

  const handleUnfollow = () => {};

  if (settings.following) {
    return (
      <Button py="$3" variant="outlined" onPress={handleUnfollow} disabled={isLoading}>
        Following
      </Button>
    );
  }

  return (
    <Button py="$3" variant="contained" onPress={handlePress} disabled={isLoading}>
      Follow
    </Button>
  );
};

export const ProfileAction = ({ userId }: Props) => {
  return <FollowButton userId={userId} />;
};
