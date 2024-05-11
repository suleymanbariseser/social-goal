import { NetworkActivityComment } from '@app/server/src/routes/activity/comments/controller';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useToastController } from '@tamagui/toast';
import { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import { ActivityCommentItem } from './activity-comment-item';
import { useActivityComments } from '../../../hooks/activity/comment/use-activity-comments';

type Props = {
  header: React.ReactNode;
  activityId: number;
  parentCommentId?: number;
};

export const ActivityCommentList = ({ header, activityId, parentCommentId }: Props) => {
  const { comments, refetch } = useActivityComments({ activityId, parentCommentId });

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

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<NetworkActivityComment>) => (
      <ActivityCommentItem comment={item} />
    ),
    []
  );

  const refreshControl = (
    <RefreshControl tintColor="white" refreshing={refreshing} onRefresh={handleRefresh} />
  );

  return (
    <FlashList
      data={comments ?? []}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={() => header}
      refreshControl={refreshControl}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <Stack py="$2" />}
      renderItem={renderItem}
      estimatedItemSize={80}
    />
  );
};
