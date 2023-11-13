import { useToastController } from '@tamagui/toast';
import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import ActivityCard from './activity-card';

import { useActivities } from '@/hooks/activity/use-activities';

type Props = {
  onPressAvatar: (userId: number) => void;
};

// TODO - accept more props to filter activities for reusing this component in other screens
export const ActivityList = ({ onPressAvatar }: Props) => {
  const { activities, fetchNextPage, refetch } = useActivities();
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToastController();

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await refetch?.();

      setRefreshing(false);
    } catch (error) {
      toast.show(error.message, {
        variant: 'error',
      });
    }
  };

  const handleEndReached = () => {
    fetchNextPage();
  };

  const renderItem = ({ item }) => (
    <ActivityCard
      admin={{
        img: item.creator.image,
        name: [item.creator.firstName, item.creator.lastName].join(' '),
      }}
      content={item.content}
      goal={item.goal.title}
      onPressAvatar={() => onPressAvatar(item.creator.id)}
    />
  );

  const refreshControl = (
    <RefreshControl tintColor="white" refreshing={refreshing} onRefresh={handleRefresh} />
  );

  const contentContainerStyle = {
    gap: 16,
  };

  return (
    <FlatList
      data={activities}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      refreshControl={refreshControl}
      onEndReached={handleEndReached}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={contentContainerStyle}
    />
  );
};
