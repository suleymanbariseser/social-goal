import { SearchRecommendations } from './search-recommendations/search-recommendations';

import { Text } from '@/components/ui/text';

type Props = {
  q: string;
};

export const SearchResult = ({ q }: Props) => {
  if (!q) return <Text>Type something to search</Text>;

  return <SearchRecommendations q={q} />;
};
