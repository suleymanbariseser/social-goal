import { Stack } from 'expo-router';

import { getCommonHeaderOptions, getCommonContentOptions } from '@/utils/navigation';

export const unstable_settings = {
  initialRouteName: 'home',
};

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        ...getCommonHeaderOptions(),
        ...getCommonContentOptions(),
      }}
    />
  );
}
