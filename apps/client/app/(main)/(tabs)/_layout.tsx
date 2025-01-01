import {
  Compass as CompassIcon,
  Home as HomeIcon,
  Plus as PlusIcon,
  User as UserIcon,
} from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';
import { getTokens } from 'tamagui';

import { trpc } from '@/lib/trpc';

export default function TabLayout() {
  const [user] = trpc.user.info.useSuspenseQuery();

  return (
    <Tabs
      initialRouteName="(feed)"
      sceneContainerStyle={{
        backgroundColor: getTokens().color.$backgroundMain.val,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: getTokens().color.$backgroundMain.val,
        },
        headerShown: false,
        tabBarLabelStyle: {
          display: 'none',
        },
      }}>
      <Tabs.Screen
        name="(feed)"
        options={{
          tabBarIcon: ({ color }) => <HomeIcon size="$6" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(discover)"
        options={{
          tabBarIcon: ({ color }) => <CompassIcon size="$6" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(create)"
        options={{
          tabBarIcon: ({ color }) => <PlusIcon size="$6" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(profile)/[id]"
        options={{
          href: `/(profile)/${user.id}`,
          tabBarIcon: ({ color }) => <UserIcon size="$6" color={color} />,
        }}
      />
    </Tabs>
  );
}
