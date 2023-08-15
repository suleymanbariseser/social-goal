import { trpc } from '@/lib/trpc';

export const useActivities = () => {
  const { data, fetchNextPage, refetch } = trpc.activity.activities.useInfiniteQuery(
    {
      limit: 15,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return {
    activities: data?.pages.flatMap((page) => page.items) ?? [],
    fetchNextPage,
    refetch,
  };
};
