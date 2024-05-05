import { GoalItem } from '@app/server/src/routes/goal/controller';
import { XStack, YStack } from 'tamagui';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

type Props = {
  goal: GoalItem;
};

export const GoalListItem = ({ goal }: Props) => {
  return (
    <XStack gap="$2">
      <Avatar src={goal.creator.image} />
      <YStack gap="$1">
        <Text variant="subtitle1">{goal.title}</Text>
        <Text variant="subtitle2" color="$textSecondary">
          by {goal.creator.fullName}
        </Text>
      </YStack>
    </XStack>
  );
};
