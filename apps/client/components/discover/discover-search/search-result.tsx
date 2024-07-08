import { Stack } from 'tamagui';

import { SearchRecommendations } from './search-recommendations/search-recommendations';

import { Text } from '@/components/ui/text';

type Props = {
  q: string;
  handleSubmit: () => void;
};

export const SearchResult = ({ q, handleSubmit }: Props) => {
  if (!q)
    return (
      <Stack p="$4">
        <Text>Type something to search</Text>
      </Stack>
    );

  return <SearchRecommendations q={q} handleSubmit={handleSubmit} />;
};
