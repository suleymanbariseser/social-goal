import { Stack } from 'expo-router';

import { getCommonContentOptions, getCommonHeaderOptions } from '@/utils/navigation';

export const unstable_settings = {
  initialRouteName: 'home',
};

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        ...getCommonHeaderOptions(),
        ...getCommonContentOptions(),
      }}>
      <Stack.Screen
        name="home"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="activity/[id]"
        options={{
          title: '',
        }}
      />
      <Stack.Screen name="goal/[id]" options={{ title: 'Goal' }} />
    </Stack>
  );
}
