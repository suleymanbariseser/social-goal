import { FlashList } from '@shopify/flash-list';
import { Stack } from 'tamagui';

import { GoalItem } from './goal-item';
import { TextItem } from './text-item';
import { UserItem } from './user-item';

import { trpc } from '@/lib/trpc';

export const DiscoverRecentSearches = () => {
  const { data } = trpc.discover.recentSearches.useQuery();

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => {
        if (item.type === 'user') {
          return <UserItem {...item} />;
        }

        if (item.type === 'goal') {
          return <GoalItem {...item} />;
        }

        return <TextItem {...item} />;
      }}
      ItemSeparatorComponent={() => <Stack py="$2" />}
      estimatedItemSize={47}
    />
  );
};
