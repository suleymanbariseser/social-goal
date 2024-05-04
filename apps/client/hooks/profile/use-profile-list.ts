import moment from 'moment';
import { useRef } from 'react';

import { trpc } from '@/lib/trpc';

export const useProfileList = () => {
  const timestamp = useRef(moment().utc().toDate());

  const {
    data,
    fetchNextPage,
    refetch: _refetch,
    isRefetching,
    isLoading,
  } = trpc.user.list.useInfiniteQuery(
    {
      limit: 15,
      timestamp: timestamp.current,
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
    profiles: data?.pages.flatMap((page) => page.items) ?? [],
    isRefetching,
    fetchNextPage,
    refetch,
    isLoading,
  };
};
