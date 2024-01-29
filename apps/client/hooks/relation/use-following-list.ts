import { UserRelationshipInput } from '@app/server/src/routes/user/relationship/schema';
import moment from 'moment';
import { useRef } from 'react';

import { trpc } from '@/lib/trpc';

export type FollowingListOptions = Partial<UserRelationshipInput>;

export const useFollowingList = (opts?: FollowingListOptions) => {
  const timestamp = useRef(moment().utc().toDate());

  const {
    data,
    isRefetching,
    fetchNextPage,
    refetch: _refetch,
  } = trpc.user.relations.followingList.useInfiniteQuery(
    {
      timestamp: timestamp.current,
      ...opts,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const refetch = () => {
    timestamp.current = moment().utc().toDate();
    _refetch();
  };

  return {
    users: data?.pages.flatMap((page) => page.items) ?? [],
    isRefetching,
    fetchNextPage,
    refetch,
  };
};
