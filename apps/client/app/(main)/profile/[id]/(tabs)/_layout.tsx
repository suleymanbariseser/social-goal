import { useLocalSearchParams } from 'expo-router';
import { Tabs } from 'expo-router/tabs';

export default function ProfileTabsLayout() {
  const params = useLocalSearchParams<{ id: string }>();
  const initialParams = { id: params.id };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      detachInactiveScreens
      sceneContainerStyle={{
        backgroundColor: 'transparent',
      }}>
      <Tabs.Screen name="goals" initialParams={initialParams} />
      <Tabs.Screen name="followers" initialParams={initialParams} />
      <Tabs.Screen name="followings" initialParams={initialParams} />
    </Tabs>
  );
}
