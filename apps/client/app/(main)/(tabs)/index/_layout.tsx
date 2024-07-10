import { Stack } from 'expo-router';

import { getCommonHeaderOptions, useCommonContentOptions } from '@/utils/navigation';

export const unstable_settings = {
  initialRouteName: 'home',
};

export default function HomeLayout() {
  const commonContentOptions = useCommonContentOptions();

  return (
    <Stack
      screenOptions={{
        ...getCommonHeaderOptions(),
        ...commonContentOptions,
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
