import moment from 'moment';
import { useRef } from 'react';
import { Stack } from 'tamagui';

import { GoalGraphContext } from './context';
import { GoalGraphList } from './goal-graph-list/goal-graph-list';
import { GoalGrid } from './goal-grid/goal-grid';

export const GoalsGraph = () => {
  const startDate = useRef(moment()).current;
  const endDate = useRef(moment().add(1, 'M')).current;

  return (
    <GoalGraphContext.Provider
      value={{
        settings: {
          dayWidth: 50,
        },
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
      }}>
      <Stack f={1} pos="relative">
        <GoalGrid />
        <GoalGraphList />
      </Stack>
    </GoalGraphContext.Provider>
  );
};
