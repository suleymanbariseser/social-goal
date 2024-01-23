import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { RelationList } from '@/components/relation/relation-list';
import { useFollowingList } from '@/hooks/relation/useFollowingList';

export default function ProfileFollowings() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { users, fetchNextPage, refetch, isRefetching } = useFollowingList({ id: Number(id) });

  return (
    <Stack f={1} px="$4">
      <RelationList
        users={users}
        emptyText="No followings found"
        onEndReached={fetchNextPage}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </Stack>
  );
}
