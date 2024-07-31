import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'tamagui';

import { ActivityList } from '@/components/activity';
import { SearchActivityListEmpty } from '@/components/discover/search/search-activity-list-empty';
import { DiscoverLocalSearchParams } from '@/components/discover/types';

const SearchActivities = () => {
  const { q } = useLocalSearchParams<DiscoverLocalSearchParams>();
  const router = useRouter();

  const handlePress = (activityId: number) => {
    router.push(`/activity/${activityId}`);
  };

  const handlePressAvatar = (userId: number) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <Stack fg={1} pt="$4">
      <ActivityList
        onPress={handlePress}
        onPressAvatar={handlePressAvatar}
        filters={{
          q,
        }}
        ListEmptyComponent={<SearchActivityListEmpty />}
        ListFooterComponent={<Stack h="$18" />}
      />
    </Stack>
  );
};

export default SearchActivities;
