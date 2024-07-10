import { Stack } from 'expo-router';

import { getCommonHeaderOptions, useCommonContentOptions } from '@/utils/navigation';

export default function CreateLayout() {
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
