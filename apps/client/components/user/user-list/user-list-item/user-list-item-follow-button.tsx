import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

type Props = {
  userId: number;
  followedByMe: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
};

export const UserListItemFollowButton = ({ userId, followedByMe, onFollow, onUnfollow }: Props) => {
  const {
    user: { id },
  } = useAuth();

  if (id === userId) {
    return null;
  }

  if (followedByMe) {
    return (
      <Button onPress={onUnfollow} size="small" variant="outlined" w="$16">
        Unfollow
      </Button>
    );
  }

  return (
    <Button onPress={onFollow} size="small" w="$16">
      Follow
    </Button>
  );
};
