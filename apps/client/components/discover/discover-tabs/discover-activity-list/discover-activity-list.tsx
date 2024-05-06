import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'tamagui';

import { DiscoverActivityListEmpty } from './discover-activity-list-empty';
import { DiscoverLocalSearchParams } from '../../types';

import { ActivityList } from '@/components/activity';

export const DiscoverActivityList = () => {
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
        ListEmptyComponent={<DiscoverActivityListEmpty />}
        ListFooterComponent={<Stack h="$18" />}
      />
    </Stack>
  );
};
