import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, Theme, YStack } from 'tamagui';

import config from '../tamagui.config';

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <YStack f={1} bg="$backgroundMain">
          <Slot />
          <StatusBar style="auto" />
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
