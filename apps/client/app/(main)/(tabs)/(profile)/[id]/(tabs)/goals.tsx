import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import { useRef } from 'react';
import { Stack } from 'tamagui';

import { GoalsGraph } from '@/components/goals/goal-graph/goal-graph';

export default function ProfileGoals() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { startDate, endDate } = useRef({
    startDate: moment().add(-15, 'days').toDate(),
    endDate: moment().add(15, 'days').toDate(),
  }).current;

  return (
    <Stack f={1}>
      <GoalsGraph id={id} startDate={startDate} endDate={endDate} />
    </Stack>
  );
}
