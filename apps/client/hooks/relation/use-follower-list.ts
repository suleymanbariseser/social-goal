import { UserRelationshipInput } from '@app/server/src/routes/user/relationship/schema';
import moment from 'moment';
import { useRef } from 'react';

import { useFollow } from './use-follow';

import { trpc } from '@/lib/trpc';
import { findItemInPages } from '@/utils/findItemInPages';

export type FollowerListOptions = Partial<UserRelationshipInput>;

export const useFollowerList = (opts?: FollowerListOptions) => {
  const timestamp = useRef(moment().utc().toDate());
  const _follow = useFollow();
  // const _unfollow = useUnfollow();
  const utils = trpc.useContext();

  const queryOptions = {
    timestamp: timestamp.current,
    ...opts,
  };

  const {
    data,
    isRefetching,
    fetchNextPage,
    refetch: _refetch,
  } = trpc.user.relations.followerList.useInfiniteQuery(queryOptions, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const validateUser = (id: number) => {
    const [pageIndex, itemIndex] = findItemInPages(data.pages, 'user.id', id);
    if (pageIndex !== -1 && itemIndex !== -1) {
      utils.user.relations.followerList.setInfiniteData(queryOptions, (oldData) => {
        const newData = { ...oldData };
        const page = newData.pages[pageIndex];

        if (page) {
          const item = page.items[itemIndex];
          if (item) {
            item.user.followedByMe = true;
          }
        }

        return newData;
      });
    }
  };

  const follow = (id: number) => {
    _follow(id, {
      onSuccess: () => {
        validateUser(id);
      },
    });
  };

  const refetch = () => {
    timestamp.current = moment().utc().toDate();
    _refetch();
  };

  return {
    users: data?.pages.flatMap((page) => page.items) ?? [],
    isRefetching,
    fetchNextPage,
    refetch,
    follow,
  };
};
