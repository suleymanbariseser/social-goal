import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { ProfileHero } from '@/components/profile/profile-hero';

const Profile = () => {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <Stack px="$6" gap="$4">
      <ProfileHero userId={+params.id} />
    </Stack>
  );
};

export default Profile;
