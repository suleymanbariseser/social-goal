import type { UserItem } from '@app/server/src/routes/user/relationship/types';
import { XStack } from 'tamagui';

import { UserListItemButton } from './user-list-item-button';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/use-auth';

type Props = {
  user: UserItem;
  onFollow: () => void;
  onUnfollow: () => void;
};

export const UserListItem = ({ user, onFollow, onUnfollow }: Props) => {
  const {
    user: { id },
  } = useAuth();

  return (
    <XStack ai="center">
      <XStack f={1} gap="$2" ai="center">
        <Avatar src={user.image} />
        <Text>{user.firstName}</Text>
      </XStack>
      {user.id !== id && (
        <XStack>
          <UserListItemButton
            followedByMe={user.followedByMe}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
          />
        </XStack>
      )}
    </XStack>
  );
};
