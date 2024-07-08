import { Search as SearchIcon } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'tamagui';

import { Text } from '@/components/ui/text';

type Props = { q: string };

export const SearchRecommendationHeader = ({ q }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/discover?q=' + q);
  };

  return (
    <Stack fd="row" gap="$2" py="$4" px="$4" onPress={handlePress}>
      <Stack w="$10">
        <SearchIcon />
      </Stack>
      <Text>{q}</Text>
    </Stack>
  );
};
