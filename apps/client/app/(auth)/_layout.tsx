import { Stack as RouterStack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'tamagui';

import { getCommonHeaderOptions, getCommonContentOptions } from '@/utils/navigation';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack f={1} pb={insets.bottom}>
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
