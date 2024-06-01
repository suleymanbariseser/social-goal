import { NetworkActivityComment } from '@app/server/src/routes/activity/comments/controller';
import moment from 'moment';
import { useRef } from 'react';

import { useDeleteComment } from './use-delete-comment';
import { useLikeComment } from './use-like-comment';
import { useUnlikeComment } from './use-unlike-comment';

import { trpc } from '@/lib/trpc';
import { findItemInPages } from '@/utils/infinity/find-item-in-pages';
import { MergeDeepPartial, mergeDeep } from '@/utils/mergeDeep';

type Options = {
  activityId: number;
  parentCommentId?: number;
};

export const useActivityComments = ({ activityId, parentCommentId }: Options) => {
  const timestamp = useRef(moment().utc().toDate());
  const utils = trpc.useContext();
  const _like = useLikeComment();
  const _unlike = useUnlikeComment();
  const _delete = useDeleteComment();

  const queryOptions = {
    activityId,
    parentCommentId,
    timestamp: timestamp.current,
  };

  const {
    data,
    fetchNextPage,
    refetch: _refetch,
    isRefetching,
    isLoading,
  } = trpc.activity.comments.list.useInfiniteQuery(queryOptions, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const refetch = () => {
    timestamp.current = moment().utc().toDate();
    _refetch();
  };

  const updateActivity = (id: number, value: MergeDeepPartial<NetworkActivityComment>) => {
    const [pageIndex, itemIndex] = findItemInPages(data.pages, 'id', id);

    if (pageIndex !== -1 && itemIndex !== -1) {
      utils.activity.comments.list.setInfiniteData(queryOptions, (oldData) => {
        const newData = { ...oldData };
        const page = newData.pages[pageIndex];
        if (page) {
          const item = page.items[itemIndex];
          if (item) {
            page.items[itemIndex] = mergeDeep<NetworkActivityComment>(item, value);
          }
        }
        return newData;
      });
    }
  };

  const like = (commentId: number) => {
    _like(commentId, {
      onSuccess: () => {
        updateActivity(commentId, {
          likedByMe: true,
          likes: (value) => (value.likedByMe ? value.likes : value.likes + 1),
        });
      },
    });
  };

  const unlike = (commentId: number) => {
    _unlike(commentId, {
      onSuccess: () => {
        updateActivity(commentId, {
          likedByMe: false,
          likes: (value) => (value.likedByMe ? value.likes - 1 : value.likes),
        });
      },
    });
  };

  const deleteComment = (commentId: number) => {
    const [pageIndex, itemIndex] = findItemInPages(data.pages, 'id', commentId);
    if (pageIndex !== -1 && itemIndex !== -1) {
      utils.activity.list.setInfiniteData(queryOptions, (oldData) => {
        const newData = { ...oldData };
        const page = newData.pages[pageIndex];

        if (page) {
          const item = page.items[itemIndex];
          if (item) {
            page.items.splice(itemIndex, 1);
          }
        }

        return newData;
      });
    }
  };

  return {
    comments: data?.pages.flatMap((page) => page.items) ?? [],
    isRefetching,
    isLoading,
    fetchNextPage,
    refetch,
    like,
    unlike,
    deleteComment,
  };
};
