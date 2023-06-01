import { Stack } from 'expo-router';
import { getConfig } from 'tamagui';

import Header from '@/components/header';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RegisterLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: getConfig().tokens.color.backgroundMain as string,
        },
        header: ({ navigation, options }) => (
          <Header back={navigation.canGoBack()} title={options.title} />
        ),
      }}
    />
  );
}
