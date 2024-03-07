import { Stack } from 'tamagui';

import { GoalGridDay } from './goal-grid-day/goal-grid-day';
import { useGoalGraphContext } from '../context';

import { getDays } from '@/hooks/calendar';

export const GoalGrid = () => {
  const { endDate, startDate } = useGoalGraphContext();

  const days = getDays({ startDate, endDate });

  return (
    <Stack fd="row" f={1} pos="absolute" l={0} t={0} r={0} b={0}>
      {days.map((day) => (
        <GoalGridDay key={day.toString()} day={day} />
      ))}
    </Stack>
  );
};
