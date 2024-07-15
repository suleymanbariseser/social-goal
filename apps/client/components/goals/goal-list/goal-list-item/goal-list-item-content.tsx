import { YStack } from 'tamagui';

import { Text } from '@/components/ui/text';

type Props = {
  title: string;
  creator: {
    fullName: string;
  };
};

export const GoalListItemContent = ({ title, creator }: Props) => (
  <YStack gap="$1" fg={1}>
    <Text variant="subtitle1">{title}</Text>
    <Text variant="subtitle2" color="$textSecondary">
      by {creator.fullName}
    </Text>
  </YStack>
);
