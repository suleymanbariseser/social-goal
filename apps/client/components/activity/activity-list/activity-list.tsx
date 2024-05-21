import { NetworkActivity } from '@app/server/src/routes/activity/controller';
import { FlashList, FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import { useToastController } from '@tamagui/toast';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import { ActivityListItem } from './activity-list-item';
import { ActivitySettingsModal } from './activity-settings';

import { ActivityOptions, useActivities } from '@/hooks/activity/use-activities';

type Props = {
  onPressAvatar: (userId: number) => void;
  onPress: (activityId: number) => void;
  filters?: ActivityOptions;
  header?: React.ReactNode;
} & Omit<
  FlashListProps<NetworkActivity>,
  'data' | 'renderItem' | 'onEndReached' | 'keyExtractor' | 'estimatedItemSize'
>;

// TODO - accept more props to filter activities for reusing this component in other screens
export const ActivityList = ({ filters, onPressAvatar, onPress, header, ...rest }: Props) => {
  const {
    activities,
    fetchNextPage,
    refetch,
    isRefetching,
    isLoading,
    like,
    unlike,
    deleteActivity,
  } = useActivities(filters);

  const [activityId, setActivityId] = useState<number | undefined>(undefined);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toast = useToastController();

  const handleRefresh = () => {
    try {
      refetch?.();
    } catch (error) {
      toast.show(error.message, {
        variant: 'error',
      });
    }
  };

  const handleEndReached = () => {
    fetchNextPage();
  };

  const renderItem = ({ item }: ListRenderItemInfo<NetworkActivity>) => (
    <ActivityListItem
      activity={item}
      onPress={() => onPress(item.id)}
      onPressAvatar={() => onPressAvatar(item.creator.id)}
      onLike={() => (item.likedByMe ? unlike(item.id) : like(item.id))}
      onPressSettings={() => {
        setIsSettingsOpen(true);
        setActivityId(item.id);
      }}
    />
  );

  const handleOpenChange = () => {
    setIsSettingsOpen(false);
  };

  const handleDelete = (id: number) => {
    setActivityId(undefined);
    deleteActivity(id);
  };

  const refreshControl = (
    <RefreshControl tintColor="white" refreshing={isRefetching} onRefresh={handleRefresh} />
  );

  return (
    <>
      <FlashList
        {...rest}
        data={activities}
        refreshing={isRefetching}
        onRefresh={handleRefresh}
        refreshControl={refreshControl}
        onEndReached={handleEndReached}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Stack py="$2" />}
        ListHeaderComponent={header ? () => <Stack mb="$2">{header}</Stack> : undefined}
        ListHeaderComponentStyle={header && { paddingBottom: 16 }}
        renderItem={renderItem}
        estimatedItemSize={152}
        ListEmptyComponent={!isLoading && rest.ListEmptyComponent}
      />
      {activityId && (
        <ActivitySettingsModal
          activityId={activityId}
          onOpenChange={handleOpenChange}
          open={isSettingsOpen}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
