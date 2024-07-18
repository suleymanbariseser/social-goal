import { FlashList } from '@shopify/flash-list';
import { Spinner, Stack } from 'tamagui';

import { SearchRecommendationHeader } from './search-recommendation-header';
import { SearchRecommendationItem } from './search-recommendation-item';

import { trpc } from '@/lib/trpc';

type Props = {
  q: string;
  handleSubmit: () => void;
};

export const SearchRecommendations = ({ q, handleSubmit }: Props) => {
  const { data, isLoading } = trpc.search.recommendation.useQuery({ q });
  const { mutate: addRecentSearch } = trpc.discover.recentSearches.add.useMutation();

  const handlePress = (userId: number) => {
    addRecentSearch({
      type: 'user',
      userId,
    });
  };

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => (
        <SearchRecommendationItem onPress={() => handlePress(item.id)} user={item} />
      )}
      keyExtractor={(i) => i.firstName}
      estimatedItemSize={30}
      ListEmptyComponent={isLoading ? <Spinner p="$4" /> : undefined}
      ListHeaderComponent={<SearchRecommendationHeader q={q} handlePress={handleSubmit} />}
      ItemSeparatorComponent={() => <Stack py="$2" />}
    />
  );
};
