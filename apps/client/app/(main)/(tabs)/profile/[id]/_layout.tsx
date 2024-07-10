import { Stack } from 'expo-router';

import { getCommonHeaderOptions, getCommonContentOptions } from '@/utils/navigation';

export const unstable_settings = {
  initialRouteName: 'followers',
};

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        ...getCommonHeaderOptions(),
        ...getCommonContentOptions(),
      }}
    />
  );
}
