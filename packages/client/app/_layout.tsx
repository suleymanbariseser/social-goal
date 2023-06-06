import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TamaguiProvider, Theme, YStack } from 'tamagui';

import config from '../tamagui.config';

import { trpcClient, trpc } from '@/lib/trpc';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcCl] = useState(() => trpcClient);
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <trpc.Provider client={trpcCl} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <Theme name="dark">
            <YStack f={1} bg="$backgroundMain">
              <Slot />
              <StatusBar style="auto" />
            </YStack>
          </Theme>
        </TamaguiProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
