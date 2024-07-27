import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { SearchGoalListEmpty } from '@/components/discover/search/search-goal-list-empty';
import { DiscoverLocalSearchParams } from '@/components/discover/types';
import { GoalList } from '@/components/goals/goal-list';

const SearchGoals = () => {
  const { q } = useLocalSearchParams<DiscoverLocalSearchParams>();

  return (
    <Stack fg={1} pt="$4">
      <GoalList
        filters={{ q }}
        ListFooterComponent={<Stack h="$18" />}
        ListEmptyComponent={<SearchGoalListEmpty />}
      />
    </Stack>
  );
};

export default SearchGoals;
