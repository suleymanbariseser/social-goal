import { Button } from '@/components/ui/button';

type Props = {
  followedByMe: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
};

export const RelationItemButton = ({ followedByMe, onFollow, onUnfollow }: Props) => {
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
