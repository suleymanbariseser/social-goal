import { Stack } from 'expo-router';
import { getTokens } from 'tamagui';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RegisterLayout() {
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
