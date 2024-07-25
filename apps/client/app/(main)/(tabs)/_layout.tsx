import {
  Compass as CompassIcon,
  Home as HomeIcon,
  Plus as PlusIcon,
  User as UserIcon,
} from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';
import { getTokens } from 'tamagui';

export default function TabLayout() {
  return (
    <Tabs
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
        name="index"
        options={{
          tabBarIcon: ({ color }) => <HomeIcon size="$6" color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ color }) => <CompassIcon size="$6" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color }) => <PlusIcon size="$6" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/[id]"
        options={{
          tabBarIcon: ({ color }) => <UserIcon size="$6" color={color} />,
        }}
      />
    </Tabs>
  );
}
