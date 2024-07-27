import { RecentSearchItem } from '@app/server/src/routes/discover/recentSearches/controller';
import { X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Stack, XStack } from 'tamagui';

import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';
import { useDeleteRecentSearch } from '@/hooks/discover/use-delete-recent-search';

type Props = RecentSearchItem;

export const TextItem = ({ text, id }: Props) => {
  const router = useRouter();
  const handleDeleteRecentSearch = useDeleteRecentSearch();

  const handlePress = () => {
    router.push('/discover/(tabs)?q=' + text);
  };

  const handleDelete = () => {
    handleDeleteRecentSearch(id);
  };

  return (
    <XStack onPress={handlePress} ai="center" px="$4" py="$2">
      <Stack fg={1}>
        <Text>{text}</Text>
      </Stack>
      <IconButton variant="text" icon={X} onPress={handleDelete} />
    </XStack>
  );
};
