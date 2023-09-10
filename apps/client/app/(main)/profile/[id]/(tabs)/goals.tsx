import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { Text } from '@/components/ui/text';

export default function ProfileGoals() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Stack>
      <Text>Goals of user #{id}</Text>
    </Stack>
  );
}
