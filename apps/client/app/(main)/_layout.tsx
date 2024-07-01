import { Stack as RouterStack } from 'expo-router';
import { getTokens } from 'tamagui';

import { DiscoverSearchInput } from '@/components/discover/discover-search/discover-search-input';
import { Header } from '@/components/header';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  return (
    <RouterStack
      screenOptions={{
        contentStyle: {
          backgroundColor: getTokens().color.$backgroundMain.val,
        },
        header: ({ navigation, options }) => (
          <Header back={navigation.canGoBack()} title={options.title} />
        ),
      }}>
      <RouterStack.Screen
        name="goal"
        options={{
          headerShown: false,
        }}
      />
      <RouterStack.Screen
        name="discover"
        options={{
          header: () => <Header title={<DiscoverSearchInput />} />,
        }}
      />
      <RouterStack.Screen
        name="profile/[id]"
        options={{
          headerShown: false,
        }}
      />
    </RouterStack>
  );
}
