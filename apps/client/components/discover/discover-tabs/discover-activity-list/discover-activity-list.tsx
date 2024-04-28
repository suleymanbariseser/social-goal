import { useLocalSearchParams, useRouter } from 'expo-router';

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
    <ActivityList
      onPress={handlePress}
      onPressAvatar={handlePressAvatar}
      filters={{
        q,
      }}
      ListEmptyComponent={<DiscoverActivityListEmpty />}
    />
  );
};
