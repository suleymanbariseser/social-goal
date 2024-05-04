import { UserItem } from '@app/server/src/routes/user/controller';
import { XStack } from 'tamagui';

import { ProfileListItemButton } from './profile-list-item-button';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

type Props = {
  user: UserItem;
  onFollow: () => void;
  onUnfollow: () => void;
};

export const ProfileListItem = ({ user, onFollow, onUnfollow }: Props) => {
  return (
    <XStack ai="center">
      <XStack f={1} gap="$2" ai="center">
        <Avatar src={user.image} />
        <Text>{user.firstName}</Text>
      </XStack>
      <XStack>
        <ProfileListItemButton
          followedByMe={user.followedByMe}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
        />
      </XStack>
    </XStack>
  );
};
