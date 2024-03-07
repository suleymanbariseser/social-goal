import { Stack, useLocalSearchParams } from 'expo-router';
import { getTokens } from 'tamagui';

import { GoalHeaderActions } from '@/components/goals/goal-header/goal-header-actions';
import { GoalHeaderTitle } from '@/components/goals/goal-header/goal-header-title';
import { Header } from '@/components/header';

export default function GoalLayout() {
  const { id } = useLocalSearchParams();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: getTokens().color.$backgroundMain.val,
        },
        header: ({ navigation }) => (
          <Header
            back={navigation.canGoBack()}
            title={<GoalHeaderTitle id={+id} />}
            actions={<GoalHeaderActions />}
          />
        ),
      }}
    />
  );
}
