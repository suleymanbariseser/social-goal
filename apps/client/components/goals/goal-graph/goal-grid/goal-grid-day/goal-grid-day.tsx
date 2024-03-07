import moment from 'moment';
import { Stack } from 'tamagui';

import { GoalGridDayLabel } from './goal-grid-day-label';
import { useGoalGraphContext } from '../../context';

type Props = {
  day: Date;
};

export const GoalGridDay = ({ day }: Props) => {
  const { startDate, endDate, settings } = useGoalGraphContext();

  const isFirstDayOfWeek = moment(day).startOf('week').isSame(day, 'day');
  const isStartDate = moment(startDate).isSame(day, 'day');
  const isEndDate = moment(endDate).isSame(day, 'day');

  const shouldShowGrid = isFirstDayOfWeek || isStartDate || isEndDate;

  return (
    <Stack h="100%" ai="center" gap="$2" o={shouldShowGrid ? 1 : 0} w={settings.dayWidth}>
      <GoalGridDayLabel day={day} />
      <Stack w={1} h="100%" boc="$textSecondary" bw={1} bs="dashed" />
    </Stack>
  );
};
