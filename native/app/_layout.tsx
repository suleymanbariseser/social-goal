import { ThemeProvider } from '@emotion/react';
import { Slot } from 'expo-router';
import { StatusBar } from 'react-native';
import theme from '../lib/theme';
import AuthProvider from '../context/auth';

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
