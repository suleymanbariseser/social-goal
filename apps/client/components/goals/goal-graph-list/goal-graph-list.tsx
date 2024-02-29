import { Stack } from 'tamagui';

import { GoalGraphListItem } from './goal-graph-list-item';
import { useGoalGraphContext } from '../context';

import { trpc } from '@/lib/trpc';

export const GoalGraphList = () => {
  const { settings, endDate, startDate, id } = useGoalGraphContext();
  const { data: goals = [] } = trpc.goal.summary.useQuery({ id, startDate, endDate });

  return (
    <Stack fd="column" gap="$2" pt="$11" px={settings.dayWidth / 2}>
      {goals.map((goal) => (
        <GoalGraphListItem
          key={goal.id}
          startDate={goal.startDate}
          endDate={goal.endDate}
          title={goal.title}
          activities={goal.activities}
        />
      ))}
    </Stack>
  );
};
