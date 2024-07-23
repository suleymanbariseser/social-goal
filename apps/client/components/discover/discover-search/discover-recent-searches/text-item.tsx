import { RecentSearchItem } from '@app/server/src/routes/discover/recentSearches/controller';
import { X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Stack, XStack } from 'tamagui';

import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';

type Props = RecentSearchItem;

export const TextItem = ({ text }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/discover?q=' + text);
  };

  return (
    <XStack onPress={handlePress} ai="center" px="$4" py="$2">
      <Stack fg={1}>
        <Text>{text}</Text>
      </Stack>
      <IconButton variant="text" icon={X} onPress={console.log} />
    </XStack>
  );
};
