import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { DiscoverLocalSearchParams } from '../../types';

import { GoalList } from '@/components/goals/goal-list';

export const DiscoverGoalList = () => {
  const { q } = useLocalSearchParams<DiscoverLocalSearchParams>();

  return (
    <Stack fg={1} pt="$4">
      <GoalList filters={{ q }} />
    </Stack>
  );
};
