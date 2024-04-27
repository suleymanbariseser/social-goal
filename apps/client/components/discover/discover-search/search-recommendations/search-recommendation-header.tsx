import { Search as SearchIcon } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'tamagui';
import { useStore } from 'zustand';

import { Text } from '@/components/ui/text';
import { discoverStore } from '@/store/discover';

export const SearchRecommendationHeader = () => {
  const { search, blurSearch } = useStore(discoverStore);
  const router = useRouter();

  const handlePress = () => {
    router.setParams({ q: search });
    blurSearch();
  };

  return (
    <Stack fd="row" gap="$2" py="$4" px="$4" onPress={handlePress}>
      <Stack w="$10">
        <SearchIcon />
      </Stack>
      <Text>{search}</Text>
    </Stack>
  );
};
