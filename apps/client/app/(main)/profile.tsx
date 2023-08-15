import { Stack } from 'tamagui';

import { ProfileHero } from '@/components/profile/profile-hero';

const Profile = () => {
  return (
    <Stack px="$6" gap="$4">
      <ProfileHero />
    </Stack>
  );
};

export default Profile;
