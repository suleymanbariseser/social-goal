import { ActivityInfiniteInput } from '@app/server/src/routes/activity/schema';
import moment from 'moment';
import { useRef } from 'react';

import { useStorageItemValue } from '@/lib/storage';
import { trpc } from '@/lib/trpc';
import { authTokenState } from '@/store/auth';

export type ActivityOptions = Partial<ActivityInfiniteInput>;

export const useActivities = (opts?: ActivityOptions) => {
  const timestamp = useRef(moment().utc().toDate());
  const authToken = useStorageItemValue(authTokenState);

  const {
    data,
    fetchNextPage,
    refetch: _refetch,
  } = trpc.activity.activities.useInfiniteQuery(
    {
      limit: 15,
      timestamp: timestamp.current,
      ...opts,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  trpc.activity.feedEvents.useSubscription(
    {
      token: authToken,
    },
    {
      onData: (data) => {
        console.log('data', data);
      },
      onError: (err) => {
        console.log('err', err);
      },
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
