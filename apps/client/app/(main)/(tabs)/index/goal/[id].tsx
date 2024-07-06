import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import { useEffect } from 'react';
import { Stack } from 'tamagui';

import { ActivityList } from '@/components/activity';
import { GoalHeaderActions } from '@/components/goals/goal-header/goal-header-actions';
import { trpc } from '@/lib/trpc';

type Params = {
  id: string;
  from?: string;
  to?: string;
};

export default function Goal() {
  const { id, from, to } = useLocalSearchParams<Params>();
  const [goal] = trpc.goal.summary.useSuspenseQuery({ id: +id });
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: goal.title,
      headerRight: () => <GoalHeaderActions />,
    });
  }, []);

  const getDate = (date?: string) => {
    if (!date) return undefined;

    const _date = moment(+date);
    if (!_date.isValid()) return undefined;

    return _date.toDate();
  };

  return (
    <Stack f={1} px="$2">
      <ActivityList
        onPress={console.log}
        onPressAvatar={console.log}
        filters={{
          goalId: +id,
          from: getDate(from),
          to: getDate(to),
        }}
      />
    </Stack>
  );
}
