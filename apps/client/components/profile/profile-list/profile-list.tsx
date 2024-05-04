import { UserItem } from '@app/server/src/routes/user/relationship/types';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useToastController } from '@tamagui/toast';
import { useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import { ProfileListItem } from './profile-list-item';

import { useProfileList } from '@/hooks/profile/use-profile-list';

export const ProfileList = () => {
  const { profiles, fetchNextPage, isRefetching, refetch } = useProfileList();
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

  const renderItem = useCallback(({ item }: ListRenderItemInfo<UserItem>) => {
    return <ProfileListItem user={item} onFollow={console.log} onUnfollow={console.log} />;
  }, []);

  const refreshControl = (
    <RefreshControl tintColor="white" refreshing={isRefetching} onRefresh={handleRefresh} />
  );

  return (
    <FlashList
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
