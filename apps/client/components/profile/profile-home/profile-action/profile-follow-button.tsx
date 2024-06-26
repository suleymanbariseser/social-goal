import { UserSettings } from '@app/server/src/routes/user/relationship/utils';
import { useToastController } from '@tamagui/toast';

import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

interface Props {
  userId: number;
}

export const ProfileFollowButton = ({ userId }: Props) => {
  const toast = useToastController();
  const utils = trpc.useUtils();

  const [settings] = trpc.user.relations.settings.useSuspenseQuery({ id: userId });
  const { mutate: follow, isLoading: isFollowLoading } = trpc.user.relations.follow.useMutation();
  const { mutate: unfollow, isLoading: isUnfollowLoading } =
    trpc.user.relations.unfollow.useMutation();

  const updateSettings = (newData: Partial<UserSettings>) => {
    utils.user.relations.settings.setData(
      {
        id: userId,
      },
      (data) => ({
        ...data,
        ...newData,
      })
    );
  };

  const handleFollow = () => {
    follow(
      { id: userId },
      {
        onError: (error) => {
          toast.show(error.message, {
            variant: 'error',
          });
        },
        onSuccess: (data) => {
          updateSettings({
            ...data,
          });
        },
      }
    );
  };

  const handleUnfollow = () => {
    unfollow(
      { id: userId },
      {
        onError: (error) => {
          toast.show(error.message, {
            variant: 'error',
          });
        },
        onSuccess: (data) => {
          updateSettings({
            ...data,
          });
        },
      }
    );
  };

  if (settings.following) {
    return (
      <Button
        py="$3"
        variant="outlined"
        onPress={handleUnfollow}
        disabled={isUnfollowLoading}
        loading={isUnfollowLoading}>
        Following
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      onPress={handleFollow}
      disabled={isFollowLoading}
      loading={isFollowLoading}>
      Follow
    </Button>
  );
};
