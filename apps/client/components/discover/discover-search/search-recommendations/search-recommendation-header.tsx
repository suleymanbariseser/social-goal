import { Search as SearchIcon } from '@tamagui/lucide-icons';
import { Stack } from 'tamagui';
import { useStore } from 'zustand';

import { Text } from '@/components/ui/text';
import { discoverStore } from '@/store/discover';

export const SearchRecommendationHeader = () => {
  const { search } = useStore(discoverStore);

  return (
    <Stack fd="row" gap="$2" py="$4" px="$4">
      <Stack w="$10">
        <SearchIcon />
      </Stack>
      <Text>{search}</Text>
    </Stack>
  );
};
