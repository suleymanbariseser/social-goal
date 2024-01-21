import { Card, Stack } from 'tamagui';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

export type ActivityCardHeaderProps = {
  admin: {
    name: string;
    img: string;
  };
  goal: string;
  onPressAvatar: () => void;
};

export const ActivityCardHeader = ({ admin, onPressAvatar, goal }: ActivityCardHeaderProps) => {
  return (
    <Card.Header fd="row" gap="$2" p="$0">
      <Avatar accessibilityLabel={admin.name} src={admin.img} onPress={onPressAvatar} />
      <Stack fd="row" gap="$1" ai="center">
        <Text variant="subtitle1">{admin.name}</Text>
        <Text variant="subtitle1" color="$textSecondary">
          #{goal.replace(/[ ]/g, '')}
        </Text>
      </Stack>
    </Card.Header>
  );
};
