import moment from 'moment';
import { useRef } from 'react';

import { trpc } from '@/lib/trpc';

export const useActivities = () => {
  const timestamp = useRef(moment().utc().toDate());

  const {
    data,
    fetchNextPage,
    refetch: _refetch,
  } = trpc.activity.activities.useInfiniteQuery(
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
    activities: data?.pages.flatMap((page) => page.items) ?? [],
    fetchNextPage,
    refetch,
  };
};
