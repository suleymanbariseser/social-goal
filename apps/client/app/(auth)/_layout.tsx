import { Stack as RouterStack } from 'expo-router';
import { Stack } from 'tamagui';

import { getCommonHeaderOptions, useCommonContentOptions } from '@/utils/navigation';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  const commonContentOptions = useCommonContentOptions();

  return (
    <Stack f={1}>
      <RouterStack
        screenOptions={{
          ...commonContentOptions,
          ...getCommonHeaderOptions(),
        }}>
        <RouterStack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </RouterStack>
    </Stack>
  );
}
