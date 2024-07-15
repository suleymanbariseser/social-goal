import { RelationShipListItem } from '@app/server/src/routes/user/relationship/types';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useToastController } from '@tamagui/toast';
import { RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import { RelationListEmpty } from './relation-list-empty';
import { UserListItem } from '../user/user-list/user-list-item';

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

  const renderItem = ({ item }: ListRenderItemInfo<RelationShipListItem>) => (
    // TODO navigate to user profile
    <UserListItem onPress={console.log}>
      <UserListItem.Content image={item.user.image} fullName={item.user.firstName} />
      <UserListItem.Actions>
        <UserListItem.FollowButton
          userId={item.user.id}
          followedByMe={item.user.followedByMe}
          onFollow={() => onFollow(item.user.id)}
          onUnfollow={() => onUnfollow(item.user.id)}
        />
      </UserListItem.Actions>
    </UserListItem>
  );

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
