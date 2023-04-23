import { ThemeProvider } from '@emotion/react';
import { Slot } from 'expo-router';
import { StatusBar } from 'react-native';
import theme from '../lib/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <Slot />
    </ThemeProvider>
  );
}
