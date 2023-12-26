import { NetworkActivity } from '@app/server/src/routes/activity/controller';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useToastController } from '@tamagui/toast';
import { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import { ActivityListItem } from './activity-list-item';

import { ActivityOptions, useActivities } from '@/hooks/activity/use-activities';

type Props = {
  onPressAvatar: (userId: number) => void;
  onPress: (activityId: number) => void;
  filters?: ActivityOptions;
  header?: React.ReactNode;
};

// TODO - accept more props to filter activities for reusing this component in other screens
export const ActivityList = ({ filters, onPressAvatar, onPress, header }: Props) => {
  const { activities, fetchNextPage, refetch } = useActivities(filters);
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

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<NetworkActivity>) => (
      <ActivityListItem
        activity={item}
        onPress={() => onPress(item.id)}
        onPressAvatar={() => onPressAvatar(item.creator.id)}
      />
    ),
    []
  );

  const refreshControl = (
    <RefreshControl tintColor="white" refreshing={refreshing} onRefresh={handleRefresh} />
  );

  return (
    <FlashList
      data={activities}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      refreshControl={refreshControl}
      onEndReached={handleEndReached}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <Stack py="$2" />}
      ListHeaderComponent={header ? () => <Stack mb="$2">{header}</Stack> : undefined}
      ListHeaderComponentStyle={{ paddingBottom: 16 }}
      renderItem={renderItem}
      estimatedItemSize={152}
    />
  );
};
