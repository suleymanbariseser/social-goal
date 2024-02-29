import moment from 'moment';
import { Stack } from 'tamagui';

import { useGoalGraphContext } from '../context';

type Props = {
  startDate: Date;
  endDate: Date;
};

export const GoalGraphListItem = ({ startDate, endDate }: Props) => {
  const { settings, startDate: graphStartDate, endDate: graphEndDate } = useGoalGraphContext();
  const tileEndDate = moment(endDate).isAfter(graphEndDate) ? graphEndDate : endDate;
  const tileStartDate = moment(startDate).isBefore(graphStartDate) ? graphStartDate : startDate;

  const dayDiff = moment(tileEndDate).diff(moment(tileStartDate), 'days');
  const width = dayDiff * settings.dayWidth;

  const diffWithStart = moment(startDate).isSameOrBefore(graphStartDate)
    ? 0
    : moment(startDate).diff(graphStartDate, 'days');

  const prevGap = diffWithStart * settings.dayWidth;

  return <Stack w={width} h={settings.goalHeight} br="$6" bg="$red1" ml={prevGap} />;
};
