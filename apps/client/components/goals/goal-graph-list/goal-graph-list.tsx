import moment from 'moment';
import { useRef } from 'react';
import { Stack } from 'tamagui';

import { GoalGraphListItem } from './goal-graph-list-item';
import { useGoalGraphContext } from '../context';

export const GoalGraphList = () => {
  const { settings } = useGoalGraphContext();

  const items = useRef([
    {
      start: moment().add(1, 'd').toDate(),
      end: moment().add(10, 'd').toDate(),
    },
    {
      start: moment().add(9, 'd').toDate(),
      end: moment().add(22, 'd').toDate(),
    },
    {
      start: moment().add(4, 'd').toDate(),
      end: moment().add(8, 'd').toDate(),
    },
  ]).current;

  return (
    <Stack fd="column" gap="$2" pt="$11" pl={settings.dayWidth / 2}>
      {items.map((item, index) => (
        <GoalGraphListItem key={index} start={item.start} end={item.end} />
      ))}
    </Stack>
  );
};
