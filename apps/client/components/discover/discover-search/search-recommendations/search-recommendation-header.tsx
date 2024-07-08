import { Search as SearchIcon } from '@tamagui/lucide-icons';
import { Stack } from 'tamagui';

import { Text } from '@/components/ui/text';

type Props = { q: string; handlePress: () => void };

export const SearchRecommendationHeader = ({ q, handlePress }: Props) => {
  return (
    <Stack fd="row" gap="$2" py="$4" px="$4" onPress={handlePress}>
      <Stack w="$10">
        <SearchIcon />
      </Stack>
      <Text>{q}</Text>
    </Stack>
  );
};
