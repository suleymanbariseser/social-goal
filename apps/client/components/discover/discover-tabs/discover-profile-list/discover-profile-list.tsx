import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { DiscoverLocalSearchParams } from '../../types';

import { ProfileList } from '@/components/profile/profile-list';

export const DiscoverProfileList = () => {
  const { q } = useLocalSearchParams<DiscoverLocalSearchParams>();

  return (
    <Stack fg={1} pt="$4">
      <ProfileList filters={{ q }} />
    </Stack>
  );
};
