import { Stack } from 'expo-router';
import { getTokens } from 'tamagui';

import { Header } from '@/components/header';

export const unstable_settings = {
  initialRouteName: 'followers',
};

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: getTokens().color.$backgroundMain.val,
        },
        header: ({ navigation, options }) => (
          <Header back={navigation.canGoBack()} title={options.title} />
        ),
      }}
    />
  );
}
