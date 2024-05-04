import { UsersListInput } from '@app/server/src/routes/user/schema';
import moment from 'moment';
import { useRef } from 'react';

import { trpc } from '@/lib/trpc';

export type ProfileListFilters = Partial<UsersListInput>;

type Options = {
  filters?: ProfileListFilters;
};

export const useProfileList = (options: Options = {}) => {
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
      ...options.filters,
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
