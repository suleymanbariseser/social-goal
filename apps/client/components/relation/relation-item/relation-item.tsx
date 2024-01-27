import { RelationShipListItem } from '@app/server/src/routes/user/relationship/types';
import { XStack } from 'tamagui';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

type Props = {
  relation: RelationShipListItem;
};

export const RelationItem = ({ relation }: Props) => {
  const { user } = relation;

  return (
    <XStack ai="center">
      <XStack f={1} gap="$2" ai="center">
        <Avatar src={user.image} />
        <Text>{user.firstName}</Text>
      </XStack>
      <XStack>
        {user.followedByMe ? (
          <Button size="small" variant="outlined" w="$16">
            Unfollow
          </Button>
        ) : (
          <Button size="small" w="$16">
            Follow
          </Button>
        )}
      </XStack>
    </XStack>
  );
};
