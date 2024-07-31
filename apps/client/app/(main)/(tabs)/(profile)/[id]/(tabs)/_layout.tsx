import { useLocalSearchParams } from 'expo-router';

import { TopTab } from '@/components/top-tab';

export default function ProfileTabsLayout() {
  const params = useLocalSearchParams<{ id: string }>();
  const initialParams = { id: params.id };

  return (
    <TopTab>
      <TopTab.Screen name="goals" initialParams={initialParams} />
      <TopTab.Screen name="followers" initialParams={initialParams} />
      <TopTab.Screen name="followings" initialParams={initialParams} />
    </TopTab>
  );
}
