import { css } from '@emotion/native';
import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: css({
          backgroundColor: 'transparent',
        }),
        headerShown: false,
      }}
    />
  );
}
