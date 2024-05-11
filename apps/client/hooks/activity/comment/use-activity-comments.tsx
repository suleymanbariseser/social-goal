import moment from 'moment';
import { useRef } from 'react';

import { trpc } from '@/lib/trpc';

type Options = {
  activityId: number;
  parentCommentId?: number;
};

export const useActivityComments = ({ activityId, parentCommentId }: Options) => {
  const timestamp = useRef(moment().utc().toDate());

  const { data, refetch: _refetch } = trpc.activity.comments.list.useQuery({
    activityId,
    parentCommentId,
  });

  const refetch = () => {
    timestamp.current = moment().utc().toDate();
    _refetch();
  };

  return {
    comments: data,
    refetch,
  };
};
