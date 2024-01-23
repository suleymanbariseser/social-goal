import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import { useRef } from 'react';
import { Stack } from 'tamagui';

import { RelationList } from '@/components/relation/relation-list';
import { trpc } from '@/lib/trpc';

export default function ProfileFollowings() {
  const timestamp = useRef(moment().utc().toDate());

  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = trpc.user.relations.followingList.useInfiniteQuery(
    {
      timestamp: timestamp.current,
      id: Number(id),
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const users = data?.pages?.flatMap((p) => p.result) ?? [];

  return (
    <Stack f={1} px="$4">
      <RelationList users={users} emptyText="No followings found" />
    </Stack>
  );
}
