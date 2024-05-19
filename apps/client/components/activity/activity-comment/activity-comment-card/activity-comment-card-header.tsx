import { Card, Stack } from 'tamagui';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { fromNow } from '@/utils/fromNow';

export type ActivityCommentCardHeaderProps = {
  admin: {
    name: string;
    img: string;
  };
  createdAt: Date;
};

export const ActivityCommentCardHeader = ({ admin, createdAt }: ActivityCommentCardHeaderProps) => (
  <Card.Header fd="row" gap="$2" p="$0">
    <Avatar accessibilityLabel={admin.name} src={admin.img} onPress={console.log} />
    <Stack fd="row" gap="$3" ai="center">
      <Text variant="subtitle1">{admin.name}</Text>
      <Text variant="caption" color="$textSecondary">
        {fromNow(createdAt)}
      </Text>
    </Stack>
  </Card.Header>
);
