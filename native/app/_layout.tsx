import AuthProvider from '@/context/auth';
import theme from '@/lib/theme';
import { ThemeProvider } from '@emotion/react';
import { Slot } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusBar barStyle='light-content' />
        <Slot />
      </AuthProvider>
    </ThemeProvider>
  );
}
