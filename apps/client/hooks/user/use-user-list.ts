import { UsersListInput } from '@app/server/src/routes/user/schema';
import moment from 'moment';
import { useRef } from 'react';

import { trpc } from '@/lib/trpc';

export type UserListFilters = Partial<UsersListInput>;

type Options = {
  filters?: UserListFilters;
};

export const useUserList = (options: Options = {}) => {
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
    users: data?.pages.flatMap((page) => page.items) ?? [],
    isRefetching,
    fetchNextPage,
    refetch,
    isLoading,
  };
};
