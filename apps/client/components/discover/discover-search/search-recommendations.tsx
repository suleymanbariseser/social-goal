import { FlashList } from '@shopify/flash-list';
import { useStore } from 'zustand';

import { Text } from '@/components/ui/text';
import { trpc } from '@/lib/trpc';
import { discoverStore } from '@/store/discover';

export const SearchRecommendations = () => {
  const { search } = useStore(discoverStore);
  const { data } = trpc.search.recommendation.useQuery({ q: search });

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <Text>{item.firstName}</Text>}
      keyExtractor={(i) => i.firstName}
      estimatedItemSize={30}
      ListEmptyComponent={<Text>No Result</Text>}
    />
  );
};
