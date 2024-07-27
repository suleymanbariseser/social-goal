import { useLocalSearchParams } from 'expo-router';
import { getTokens } from 'tamagui';

import { TopTab } from '@/components/top-tab';

export default function ProfileTabsLayout() {
  const params = useLocalSearchParams<{ id: string }>();
  const initialParams = { id: params.id };

  return (
    <TopTab
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
        tabBarLabelStyle: {
          color: getTokens().color.$textPrimary.val,
        },
        tabBarIndicatorStyle: {
          backgroundColor: getTokens().color.$primaryDark.val,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: 'transparent',
      }}>
      <TopTab.Screen name="goals" initialParams={initialParams} />
      <TopTab.Screen name="followers" initialParams={initialParams} />
      <TopTab.Screen name="followings" initialParams={initialParams} />
    </TopTab>
  );
}
