import { RelationShipListItem } from '@app/server/src/routes/user/relationship/types';
import { XStack } from 'tamagui';

import { RelationItemButton } from './relation-item-button';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

type Props = {
  relation: RelationShipListItem;
  onFollow: () => void;
  onUnfollow: () => void;
};

export const RelationItem = ({ relation, onFollow, onUnfollow }: Props) => {
  const { user } = relation;

  return (
    <XStack ai="center">
      <XStack f={1} gap="$2" ai="center">
        <Avatar src={user.image} />
        <Text>{user.firstName}</Text>
      </XStack>
      <XStack>
        <RelationItemButton
          followedByMe={user.followedByMe}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
        />
      </XStack>
    </XStack>
  );
};
