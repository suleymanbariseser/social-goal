import type { RecentSearchItem } from '@app/server/src/routes/discover/recentSearches/controller';
import { FlashList } from '@shopify/flash-list';

import { ClearAllButton } from './clear-all-button';
import { GoalItem } from './goal-item';
import { TextItem } from './text-item';
import { UserItem } from './user-item';

import { trpc } from '@/lib/trpc';

type ContentProps = {
  item: RecentSearchItem;
};

const Content = ({ item }: ContentProps) => {
  if (item.type === 'user') {
    return <UserItem {...item} />;
  }

  if (item.type === 'goal') {
    return <GoalItem {...item} />;
  }

  return <TextItem {...item} />;
};

export const DiscoverRecentSearches = () => {
  const { data } = trpc.discover.recentSearches.list.useQuery();

  return (
    <FlashList
      data={data}
      ListHeaderComponent={!!data?.length && <ClearAllButton />}
      renderItem={({ item }) => <Content item={item} />}
      estimatedItemSize={47}
    />
  );
};
