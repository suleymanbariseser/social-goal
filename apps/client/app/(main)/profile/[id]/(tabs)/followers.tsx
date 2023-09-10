import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { Text } from '@/components/ui/text';

export default function ProfileFollowers() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Stack>
      <Text>Followers of user #{id}</Text>
    </Stack>
  );
}
