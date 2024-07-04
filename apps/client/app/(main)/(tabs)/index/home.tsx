import { useRouter } from 'expo-router';
import { Stack } from 'tamagui';

import { ActivityList } from '@/components/activity';

export default function Home() {
  const router = useRouter();

  const handlePress = (activityId: number) => {
    router.push(`/activity/${activityId}`);
  };

  const handlePressAvatar = (userId: number) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <Stack pos="relative" f={1} px="$2">
      <ActivityList onPress={handlePress} onPressAvatar={handlePressAvatar} />
    </Stack>
  );
}
