import { Search as SearchIcon } from '@tamagui/lucide-icons';
import { Stack, XStack } from 'tamagui';

import { Text } from '@/components/ui/text';

type Props = { q: string; handlePress: () => void };

export const SearchRecommendationHeader = ({ q, handlePress }: Props) => {
  return (
    <XStack gap="$2" py="$2" px="$4" onPress={handlePress}>
      <Stack w="$10">
        <SearchIcon />
      </Stack>
      <Stack fs={1}>
        <Text>{q}</Text>
      </Stack>
    </XStack>
  );
};
