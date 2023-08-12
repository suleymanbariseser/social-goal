import { ToastProvider } from '@tamagui/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect, useState } from 'react';
import { TamaguiProvider, Theme, YStack } from 'tamagui';

import config from '../tamagui.config';

import { AppToast, AppToastViewport } from '@/components/toast';
import { useAuth } from '@/hooks/useAuth';
import { trpcClient, trpc } from '@/lib/trpc';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const rootSegment = useSegments()[0];
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      rootSegment !== '(auth)'
    ) {
      router.replace('/(auth)');
    } else if (user && rootSegment !== '(main)') {
      router.replace('/(main)');
    }
  }, [user, rootSegment]);

  return <>{children}</>;
};

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <Theme name="dark">
            <ToastProvider
              burntOptions={{
                from: 'top',
              }}>
              <YStack f={1} bg="$backgroundMain">
                <AppToastViewport />
                <AppToast />
                <Suspense>
                  <AuthWrapper>
                    <Slot />
                  </AuthWrapper>
                </Suspense>
                <StatusBar style="light" />
              </YStack>
            </ToastProvider>
          </Theme>
        </TamaguiProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
