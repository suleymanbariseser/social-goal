import { useStore } from 'zustand';

import { SearchRecommendations } from './search-recommendations';

import { Text } from '@/components/ui/text';
import { discoverStore } from '@/store/discover';

export const SearchResult = () => {
  const { search } = useStore(discoverStore);

  if (!search) return <Text>Type something to search</Text>;

  return <SearchRecommendations />;
};
