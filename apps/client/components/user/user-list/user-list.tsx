import { UserItem } from '@app/server/src/routes/user/relationship/types';
import { FlashList, FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'expo-router';
import { RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import { UserListItem } from './user-list-item/user-list-item';

import { UserListFilters, useUserList } from '@/hooks/user/use-user-list';

type Props = {
  filters?: UserListFilters;
} & Omit<
  FlashListProps<UserItem>,
  'data' | 'renderItem' | 'onEndReached' | 'keyExtractor' | 'estimatedItemSize'
>;

export const UserList = ({ filters, ...rest }: Props) => {
  const toast = useToastController();
  const router = useRouter();
  const {
    users: profiles,
    fetchNextPage,
    isRefetching,
    refetch,
    follow,
    unFollow,
  } = useUserList({
    filters,
  });

  const handleRefresh = () => {
    try {
      refetch?.();
    } catch (error) {
      toast.show(error.message, {
        variant: 'error',
      });
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<UserItem>) => (
    <UserListItem onPress={() => router.push(`/profile/${item.id}`)}>
      <UserListItem.Content image={item.image} fullName={item.firstName} />
      <UserListItem.Actions>
        <UserListItem.FollowButton
          userId={item.id}
          followedByMe={item.followedByMe}
          onFollow={() => follow(item.id)}
          onUnfollow={() => unFollow(item.id)}
        />
      </UserListItem.Actions>
    </UserListItem>
  );

  const refreshControl = (
    <RefreshControl tintColor="white" refreshing={isRefetching} onRefresh={handleRefresh} />
  );

  return (
    <FlashList
      {...rest}
      data={profiles}
      refreshing={isRefetching}
      onRefresh={handleRefresh}
      refreshControl={refreshControl}
      onEndReached={fetchNextPage}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <Stack py="$2" />}
      estimatedItemSize={40}
      renderItem={renderItem}
    />
  );
};
