import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { Text } from '@/components/ui/text';

export default function ProfileFollowings() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Stack>
      <Text>Followings of user #{id}</Text>
    </Stack>
  );
}
