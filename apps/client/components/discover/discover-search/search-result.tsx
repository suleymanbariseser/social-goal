import { DiscoverRecentSearches } from './discover-recent-searches';
import { SearchRecommendations } from './search-recommendations/search-recommendations';

type Props = {
  q: string;
  handleSubmit: () => void;
};

export const SearchResult = ({ q, handleSubmit }: Props) => {
  if (!q) return <DiscoverRecentSearches />;

  return <SearchRecommendations q={q} handleSubmit={handleSubmit} />;
};
