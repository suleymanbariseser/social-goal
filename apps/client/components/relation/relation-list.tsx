import { RelationShipListItem } from '@app/server/src/routes/user/relationship/types';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useToastController } from '@tamagui/toast';
import { RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import { RelationListEmpty } from './relation-list-empty';
import { ProfileListItem } from '../profile/profile-list/profile-list-item';

type Props = {
  users: RelationShipListItem[];
  emptyText: string;
  onEndReached: () => void;
  onRefresh: () => void;
  refreshing?: boolean;
  onFollow: (userId: number) => void;
  onUnfollow: (userId: number) => void;
};

export const RelationList = ({
  users,
  emptyText,
  onEndReached,
  onRefresh,
  refreshing,
  onFollow,
  onUnfollow,
}: Props) => {
  const toast = useToastController();

  const renderItem = ({ item }: ListRenderItemInfo<RelationShipListItem>) => {
    return (
      <ProfileListItem
        user={item.user}
        onFollow={() => onFollow(item.user.id)}
        onUnfollow={() => onUnfollow(item.user.id)}
      />
    );
  };

  const handleRefresh = async () => {
    try {
      await onRefresh?.();
    } catch (error) {
      toast.show(error.message, {
        variant: 'error',
      });
    }
  };

  const refreshControl = (
    <RefreshControl tintColor="white" refreshing={refreshing} onRefresh={handleRefresh} />
  );

  return (
    <FlashList
      data={users}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      refreshControl={refreshControl}
      onEndReached={onEndReached}
      renderItem={renderItem}
      estimatedItemSize={70}
      ItemSeparatorComponent={() => <Stack py="$2" />}
      keyExtractor={(u) => `${u.id}`}
      ListEmptyComponent={<RelationListEmpty text={emptyText} />}
    />
  );
};
