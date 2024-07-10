import { Stack } from 'expo-router';

import { getCommonHeaderOptions, useCommonContentOptions } from '@/utils/navigation';

export default function MessageLayout() {
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
