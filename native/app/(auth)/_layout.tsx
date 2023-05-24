import { Stack as RouterStack } from 'expo-router';
import { Stack } from 'tamagui';

import Header from '@/components/header';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  return (
    <Stack f={1}>
      <RouterStack
        screenOptions={{
          contentStyle: {
            backgroundColor: 'transparent',
          },
          header: ({ navigation, options }) => (
            <Header back={navigation.canGoBack()} title={options.title} />
          ),
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
