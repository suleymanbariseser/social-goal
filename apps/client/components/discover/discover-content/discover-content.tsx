import { useLocalSearchParams } from 'expo-router';

import { DiscoverTabs } from '../discover-tabs/discover-tabs';
import { DiscoverLocalSearchParams } from '../types';

import { ActivityList } from '@/components/activity';

export const DiscoverContent = () => {
  const { q } = useLocalSearchParams<DiscoverLocalSearchParams>();

  if (q) {
    return <DiscoverTabs />;
  }

  return <ActivityList onPress={console.log} onPressAvatar={console.log} />;
};
