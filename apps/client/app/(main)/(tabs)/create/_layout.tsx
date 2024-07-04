import { Stack } from 'expo-router';

import { getCommonContentOptions, getCommonHeaderOptions } from '@/utils/navigation';

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
