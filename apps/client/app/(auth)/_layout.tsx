import { Stack as RouterStack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, getTokens } from 'tamagui';

import { Header } from '@/components/header';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  const safeArea = useSafeAreaInsets();

  return (
    <Stack f={1}>
      <RouterStack
        screenOptions={{
          contentStyle: {
            backgroundColor: getTokens().color.$backgroundMain.val,
            paddingBottom: safeArea.bottom,
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
