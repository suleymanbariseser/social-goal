import { Card, Stack } from 'tamagui';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

export type ActivityCommentCardHeaderProps = {
  admin: {
    name: string;
    img: string;
  };
};

export const ActivityCommentCardHeader = ({ admin }: ActivityCommentCardHeaderProps) => (
  <Card.Header fd="row" gap="$2" p="$0">
    <Avatar accessibilityLabel={admin.name} src={admin.img} onPress={console.log} />
    <Stack fd="row" gap="$1" ai="center">
      <Text variant="subtitle1">{admin.name}</Text>
    </Stack>
  </Card.Header>
);
