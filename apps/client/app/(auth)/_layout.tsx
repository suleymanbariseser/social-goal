import { Stack as RouterStack } from 'expo-router';
import { Stack } from 'tamagui';

import { trpc } from '@/lib/trpc';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  const listQuery = trpc.user.list.useQuery();

  console.log(listQuery);

  return (
    <Stack f={1}>
      <RouterStack
        screenOptions={{
          contentStyle: {
            backgroundColor: 'transparent',
          },
          headerShown: false,
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
