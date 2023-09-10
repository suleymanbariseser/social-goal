import { Stack } from 'expo-router';
import { getTokens } from 'tamagui';

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
        headerShown: false,
      }}
    />
  );
}
