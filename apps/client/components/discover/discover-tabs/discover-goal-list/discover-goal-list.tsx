import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { DiscoverGoalListEmpty } from './discover-goal-list-empty';
import { DiscoverLocalSearchParams } from '../../types';

import { GoalList } from '@/components/goals/goal-list';

export const DiscoverGoalList = () => {
  const { q } = useLocalSearchParams<DiscoverLocalSearchParams>();

  return (
    <Stack fg={1} pt="$4">
      <GoalList
        filters={{ q }}
        ListFooterComponent={<Stack h="$18" />}
        ListEmptyComponent={<DiscoverGoalListEmpty />}
      />
    </Stack>
  );
};
