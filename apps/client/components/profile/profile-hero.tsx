import { Stack } from 'tamagui';

import { ProfileAction } from './profile-action';
import { ProfileDescription } from './profile-description';
import { ProfileHeader } from './profile-header';
import { ProfileStatistics } from './profile-statictics';

export const ProfileHero = () => {
  return (
    <Stack w="100%" gap="$3">
      <ProfileHeader />
      <ProfileDescription />
      <ProfileStatistics />
      <ProfileAction />
    </Stack>
  );
};
