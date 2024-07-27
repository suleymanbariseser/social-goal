import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { DiscoverLocalSearchParams } from '../types';

import { Text } from '@/components/ui/text';

export const SearchActivityListEmpty = () => {
  const { q } = useLocalSearchParams<DiscoverLocalSearchParams>();

  return (
    <Stack ai="center" gap="$4">
      <Text variant="subtitle1" ta="center">
        No activities found for {`"${q}"`}
      </Text>
      <Text variant="body2">Either clear the filter or search something else</Text>
    </Stack>
  );
};
