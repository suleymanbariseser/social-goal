import { GoalListInput } from '@app/server/src/routes/goal/schema';
import moment from 'moment';
import { useRef } from 'react';

import { trpc } from '@/lib/trpc';

export type GoalListFilters = Partial<GoalListInput>;

type Options = {
  filters?: GoalListFilters;
};

export const useGoalList = (options: Options = {}) => {
  const timestamp = useRef(moment().utc().toDate());

  const {
    data,
    fetchNextPage,
    refetch: _refetch,
    isRefetching,
    isLoading,
  } = trpc.goal.list.useInfiniteQuery(
    {
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
    goals: data?.pages.flatMap((page) => page.items) ?? [],
    isRefetching,
    fetchNextPage,
    refetch,
    isLoading,
  };
};
