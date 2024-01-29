import { UserRelationshipInput } from '@app/server/src/routes/user/relationship/schema';
import { RelationShipListItem } from '@app/server/src/routes/user/relationship/types';
import { merge } from 'lodash';
import moment from 'moment';
import { useRef } from 'react';
import { DeepPartial } from 'react-hook-form';

import { useFollow } from './use-follow';
import { useUnfollow } from './use-unfollow';

import { trpc } from '@/lib/trpc';
import { findItemInPages } from '@/utils/infinity/find-item-in-pages';

export type FollowingListOptions = Partial<UserRelationshipInput>;

export const useFollowingList = (opts?: FollowingListOptions) => {
  const timestamp = useRef(moment().utc().toDate());
  const _follow = useFollow();
  const _unfollow = useUnfollow();
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
  } = trpc.user.relations.followingList.useInfiniteQuery(queryOptions, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const updateUser = (id: number, value: DeepPartial<RelationShipListItem>) => {
    const [pageIndex, itemIndex] = findItemInPages(data.pages, 'user.id', id);
    if (pageIndex !== -1 && itemIndex !== -1) {
      utils.user.relations.followingList.setInfiniteData(queryOptions, (oldData) => {
        const newData = { ...oldData };
        const page = newData.pages[pageIndex];

        if (page) {
          const item = page.items[itemIndex];
          if (item) {
            page.items[itemIndex] = merge<RelationShipListItem, DeepPartial<RelationShipListItem>>(
              item,
              value
            );
          }
        }

        return newData;
      });
    }
  };

  const follow = (id: number) => {
    _follow(id, {
      onSuccess: () => {
        updateUser(id, {
          user: {
            followedByMe: true,
          },
        });
      },
    });
  };

  const unFollow = (id: number) => {
    _unfollow(id, {
      onSuccess: () => {
        updateUser(id, {
          user: {
            followedByMe: false,
          },
        });
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
    unFollow,
  };
};
