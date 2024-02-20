import moment from 'moment';
import { useRef } from 'react';
import { Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { Stack } from 'tamagui';

import { GoalGraphContext } from './context';
import { GoalGraphList } from './goal-graph-list/goal-graph-list';
import { GoalGrid } from './goal-grid/goal-grid';
import { GraphScrollArea } from './graph-scroll-area/graph-scroll-area';

export const GoalsGraph = () => {
  const startDate = useRef(moment()).current;
  const endDate = useRef(moment().add(1, 'M')).current;
  const gridWidth = useSharedValue(Dimensions.get('window').width);

  const handleLayout = (event: any) => {
    gridWidth.value = event.nativeEvent.layout.width;
  };

  return (
    <GoalGraphContext.Provider
      value={{
        settings: {
          dayWidth: 50,
          gridWidth,
        },
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
      }}>
      <GestureHandlerRootView onLayout={handleLayout} style={{ flex: 1 }}>
        <GraphScrollArea>
          <Stack f={1} pos="relative">
            <GoalGrid />
            <GoalGraphList />
          </Stack>
        </GraphScrollArea>
      </GestureHandlerRootView>
    </GoalGraphContext.Provider>
  );
};
