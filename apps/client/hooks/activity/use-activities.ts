import { NetworkActivity } from '@app/server/src/routes/activity/controller';
import { ActivityInfiniteInput } from '@app/server/src/routes/activity/schema';
import moment from 'moment';
import { useRef } from 'react';

import { useLike } from './use-like';

import { useStorageItemValue } from '@/lib/storage';
import { trpc } from '@/lib/trpc';
import { authTokenState } from '@/store/auth';
import { findItemInPages } from '@/utils/infinity/find-item-in-pages';
import { MergeDeepPartial, mergeDeep } from '@/utils/mergeDeep';

export type ActivityOptions = Partial<ActivityInfiniteInput>;

export const useActivities = (options?: ActivityOptions) => {
  const timestamp = useRef(moment().utc().toDate());
  const authToken = useStorageItemValue(authTokenState);
  const _like = useLike();
  const utils = trpc.useContext();

  const queryOptions = {
    timestamp: timestamp.current,
    ...options,
  };

  const {
    data,
    fetchNextPage,
    refetch: _refetch,
    isRefetching,
    isLoading,
  } = trpc.activity.list.useInfiniteQuery(queryOptions, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

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

  const updateActivity = (id: number, value: MergeDeepPartial<NetworkActivity>) => {
    const [pageIndex, itemIndex] = findItemInPages(data.pages, 'id', id);
    if (pageIndex !== -1 && itemIndex !== -1) {
      utils.activity.list.setInfiniteData(queryOptions, (oldData) => {
        const newData = { ...oldData };
        const page = newData.pages[pageIndex];

        if (page) {
          const item = page.items[itemIndex];
          if (item) {
            page.items[itemIndex] = mergeDeep<NetworkActivity>(item, value);
          }
        }

        return newData;
      });
    }
  };

  const like = (id: number) => {
    _like(id, {
      onSuccess: () => {
        updateActivity(id, {
          likes: (value) => (value.likedByMe ? value.likes : value.likes + 1),
          likedByMe: true,
        });
      },
    });
  };

  return {
    activities: data?.pages.flatMap((page) => page.items) ?? [],
    isRefetching,
    fetchNextPage,
    refetch,
    isLoading,
    like,
  };
};
