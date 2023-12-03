import { Stack } from 'expo-router';
import { getTokens } from 'tamagui';

export default function ActivityLayout() {
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
