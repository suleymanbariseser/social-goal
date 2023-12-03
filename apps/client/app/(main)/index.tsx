import { useRouter } from 'expo-router';
import { Stack } from 'tamagui';

import { ActivityList } from '@/components/activity/activity-list/activity-list';
import HomeTabs from '@/components/home/home-tabs';

const Home = () => {
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
      <HomeTabs />
    </Stack>
  );
};

export default Home;
