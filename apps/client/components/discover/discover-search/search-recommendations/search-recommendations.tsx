import { FlashList } from '@shopify/flash-list';
import { Spinner, Stack } from 'tamagui';
import { useStore } from 'zustand';

import { SearchRecommendationHeader } from './search-recommendation-header';
import { SearchRecommendationItem } from './search-recommendation-item';

import { trpc } from '@/lib/trpc';
import { discoverStore } from '@/store/discover';

export const SearchRecommendations = () => {
  const { search } = useStore(discoverStore);
  const { data, isLoading } = trpc.search.recommendation.useQuery({ q: search });

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <SearchRecommendationItem user={item} />}
      keyExtractor={(i) => i.firstName}
      estimatedItemSize={30}
      ListEmptyComponent={isLoading ? <Spinner p="$4" /> : undefined}
      ListHeaderComponent={<SearchRecommendationHeader />}
      ItemSeparatorComponent={() => <Stack py="$2" />}
    />
  );
};
