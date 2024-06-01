import { NetworkActivityComment } from '@app/server/src/routes/activity/comments/controller';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useToastController } from '@tamagui/toast';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import { ActivityCommentItem } from './activity-comment-item';
import { ActivityCommentSettingsModal } from './activity-comment-settings-modal/activity-comment-settings-modal';
import { useActivityComments } from '../../../hooks/activity/comment/use-activity-comments';

type Props = {
  header: React.ReactNode;
  activityId: number;
  parentCommentId?: number;
};

export const ActivityCommentList = ({ header, activityId, parentCommentId }: Props) => {
  const { comments, refetch, like, unlike, fetchNextPage, isRefetching, deleteComment } =
    useActivityComments({
      activityId,
      parentCommentId,
    });

  const [commentId, setCommentId] = useState<number | undefined>(undefined);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

  const handleOpenChange = () => {
    setIsSettingsOpen(false);
  };

  const handleDelete = (id: number) => {
    setCommentId(undefined);
    deleteComment(id);
  };

  const renderItem = ({ item }: ListRenderItemInfo<NetworkActivityComment>) => (
    <ActivityCommentItem
      comment={item}
      onPressLike={() => (item.likedByMe ? unlike(item.id) : like(item.id))}
      onPressComment={console.log}
      onPressSettings={() => {
        setIsSettingsOpen(true);
        setCommentId(item.id);
      }}
    />
  );

  const refreshControl = (
    <RefreshControl tintColor="white" refreshing={refreshing} onRefresh={handleRefresh} />
  );

  return (
    <>
      <FlashList
        data={comments}
        refreshing={isRefetching}
        onRefresh={handleRefresh}
        refreshControl={refreshControl}
        onEndReached={fetchNextPage}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Stack py="$2" />}
        ListHeaderComponent={header ? () => <Stack mb="$2">{header}</Stack> : undefined}
        ListHeaderComponentStyle={header && { paddingBottom: 16 }}
        renderItem={renderItem}
        estimatedItemSize={80}
      />
      {activityId && (
        <ActivityCommentSettingsModal
          commentId={commentId}
          onOpenChange={handleOpenChange}
          open={isSettingsOpen}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
