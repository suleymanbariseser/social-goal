import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { RelationList } from '@/components/relation/relation-list';
import { useFollowerList } from '@/hooks/relation/useFollowerList';

export default function ProfileFollowers() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { users, fetchNextPage, refetch, isRefetching } = useFollowerList({ id: Number(id) });

  return (
    <Stack f={1} px="$4">
      <RelationList
        users={users}
        emptyText="No followers found"
        onEndReached={fetchNextPage}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </Stack>
  );
}
