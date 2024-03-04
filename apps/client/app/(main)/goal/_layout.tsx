import { Stack } from 'expo-router';
import { getTokens } from 'tamagui';

export default function GoalLayout() {
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
