import { useRouter } from 'expo-router';
import { Card, Stack } from 'tamagui';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

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
};

export const ActivityCardHeader = ({ admin, onPressAvatar, goal }: ActivityCardHeaderProps) => {
  const router = useRouter();

  const handleGoalPress = () => {
    router.push(`/goal/${goal.id}`);
  };

  return (
    <Card.Header fd="row" gap="$2" p="$0">
      <Avatar accessibilityLabel={admin.name} src={admin.img} onPress={onPressAvatar} />
      <Stack fd="column" gap="$1">
        <Text variant="subtitle1">{admin.name}</Text>
        <Stack onPress={handleGoalPress}>
          <Text variant="subtitle2" color="$textSecondary">
            {goal.title}
          </Text>
        </Stack>
      </Stack>
    </Card.Header>
  );
};
