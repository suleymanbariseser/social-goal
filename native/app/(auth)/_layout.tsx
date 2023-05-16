import { css } from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Stack } from 'expo-router';
import Header from '@/components/header';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: css({
          backgroundColor: theme.palette.background.default,
        }),
        header: ({ navigation, options }) => (
          <Header back={navigation.canGoBack()} title={options.title} />
        ),
        
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
