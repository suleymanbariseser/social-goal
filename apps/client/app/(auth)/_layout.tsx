import { Stack as RouterStack } from 'expo-router';
import { Stack } from 'tamagui';

import { getCommonHeaderOptions, getCommonContentOptions } from '@/utils/navigation';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  return (
    <Stack f={1}>
      <RouterStack
        screenOptions={{
          ...getCommonContentOptions(),
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
