import { useRouter } from 'expo-router';
import { Card, Stack } from 'tamagui';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { fromNow } from '@/utils/fromNow';

export type ActivityCardHeaderProps = {
  admin: {
    name: string;
    img: string;
  };
  goal: {
    id: number;
    title: string;
  };
  onPressAvatar: () => void;
  createdAt: Date;
};

export const ActivityCardHeader = ({
  admin,
  onPressAvatar,
  goal,
  createdAt,
}: ActivityCardHeaderProps) => {
  const router = useRouter();

  const handleGoalPress = () => {
    router.push(`/goal/${goal.id}`);
  };

  return (
    <Card.Header fd="row" gap="$2" p="$0">
      <Avatar accessibilityLabel={admin.name} src={admin.img} onPress={onPressAvatar} />
      <Stack fd="column" gap="$1">
        <Stack fd="row" gap="$3" ai="center">
          <Text variant="subtitle1">{admin.name}</Text>
          <Text variant="caption" color="$textSecondary">
            {fromNow(createdAt)}
          </Text>
        </Stack>
        <Stack onPress={handleGoalPress}>
          <Text variant="subtitle2" color="$textSecondary">
            {goal.title}
          </Text>
        </Stack>
      </Stack>
    </Card.Header>
  );
};
