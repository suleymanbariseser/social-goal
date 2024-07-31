import { Stack } from 'expo-router';

import { getCommonHeaderOptions, getCommonContentOptions } from '@/utils/navigation';

export default function CreateLayout() {
  return (
    <Stack
      screenOptions={{
        ...getCommonHeaderOptions(),
        ...getCommonContentOptions(),
      }}
    />
  );
}
