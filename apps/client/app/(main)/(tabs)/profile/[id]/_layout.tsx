import { Stack } from 'expo-router';

import { getCommonHeaderOptions, useCommonContentOptions } from '@/utils/navigation';

export const unstable_settings = {
  initialRouteName: 'followers',
};

export default function ProfileLayout() {
  const commonContentOptions = useCommonContentOptions();

  return (
    <Stack
      screenOptions={{
        ...getCommonHeaderOptions(),
        ...commonContentOptions,
      }}
    />
  );
}
