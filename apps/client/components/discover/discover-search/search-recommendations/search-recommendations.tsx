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

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => <SearchRecommendationItem user={item} />}
      keyExtractor={(i) => i.firstName}
      estimatedItemSize={30}
      ListEmptyComponent={isLoading ? <Spinner p="$4" /> : undefined}
      ListHeaderComponent={<SearchRecommendationHeader q={q} handlePress={handleSubmit} />}
      ItemSeparatorComponent={() => <Stack py="$2" />}
    />
  );
};
