import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { Text } from '@/components/ui/text';
import { GoalScreenParams } from '@/types/goal';

export const GoalListEmpty = () => {
  const { from, to } = useLocalSearchParams<GoalScreenParams>();

  const hasFilters = from || to;

  if (hasFilters) {
    return (
      <Stack ai="center" gap="$4">
        <Text variant="subtitle1" ta="center">
          No activities found for specified filters
        </Text>
        <Text variant="body2">Either clear the filter or search something else</Text>
      </Stack>
    );
  }

  return (
    <Stack ai="center" gap="$4">
      <Text variant="subtitle1" ta="center">
        No activities found
      </Text>
      <Text variant="body2">Try searching something else</Text>
    </Stack>
  );
};
