import { UserItem } from '@app/server/src/routes/user/relationship/types';
import { UsersListInput } from '@app/server/src/routes/user/schema';
import merge from 'lodash.merge';
import moment from 'moment';
import { useRef } from 'react';
import { DeepPartial } from 'react-hook-form';

import { useFollow } from '../relation/use-follow';
import { useUnfollow } from '../relation/use-unfollow';

import { trpc } from '@/lib/trpc';
import { findItemInPages } from '@/utils/infinity/find-item-in-pages';

export type UserListFilters = Partial<UsersListInput>;

type Options = {
  filters?: UserListFilters;
};

export const useUserList = (options: Options = {}) => {
  const timestamp = useRef(moment().utc().toDate());
  const _follow = useFollow();
  const _unfollow = useUnfollow();
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
  } = trpc.user.list.useInfiniteQuery(queryOptions, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const updateUser = (id: number, value: DeepPartial<UserItem>) => {
    const [pageIndex, itemIndex] = findItemInPages(data.pages, 'id', id);

    if (pageIndex !== -1 && itemIndex !== -1) {
      utils.user.list.setInfiniteData(queryOptions, (oldData) => {
        const newData = { ...oldData };
        const page = newData.pages[pageIndex];

        if (page) {
          const item = page.items[itemIndex];
          if (item) {
            page.items[itemIndex] = merge<UserItem, DeepPartial<UserItem>>(item, value);
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
          followedByMe: true,
        });
      },
    });
  };

  const unFollow = (id: number) => {
    _unfollow(id, {
      onSuccess: () => {
        updateUser(id, {
          followedByMe: false,
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
    isLoading,
    unFollow,
    follow,
  };
};
