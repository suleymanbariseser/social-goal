import moment from 'moment';
import { useRef } from 'react';
import { Stack } from 'tamagui';

import { useGoalGraphContext } from '../context';

type Props = {
  start: Date;
  end: Date;
};

export const GoalGraphListItem = ({ start, end }: Props) => {
  const { settings } = useGoalGraphContext();
  const startDate = useRef(moment()).current;
  const dayDiff = moment(end).diff(moment(start), 'days');
  const width = dayDiff * settings.dayWidth;
  const prevGap = moment(start).diff(startDate, 'days') * 50;

  return <Stack w={width} h={40} br="$6" bg="$red1" ml={prevGap} />;
};
