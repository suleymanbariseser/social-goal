import moment from 'moment';
import { useRef } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import { GoalGraphContext } from './context';
import { GoalGraphContent } from './goal-graph-content';
import { GraphScrollArea } from './graph-scroll-area/graph-scroll-area';

export const GoalsGraph = () => {
  const startDate = useRef(moment()).current;
  const endDate = useRef(moment().add(1, 'M')).current;
  const gridWidth = useSharedValue(Dimensions.get('window').width);
  const gridHeight = useSharedValue(Dimensions.get('window').height);
  const contentWidth = useSharedValue(Dimensions.get('window').width);
  const contentHeight = useSharedValue(Dimensions.get('window').height);

  const handleLayout = (event: LayoutChangeEvent) => {
    gridWidth.value = event.nativeEvent.layout.width;
    gridHeight.value = event.nativeEvent.layout.height;
  };

  return (
    <GoalGraphContext.Provider
      value={{
        settings: {
          dayWidth: 50,
          goalHeight: 50,
          gridWidth,
          gridHeight,
          contentWidth,
          contentHeight,
        },
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
      }}>
      <GestureHandlerRootView onLayout={handleLayout} style={{ flex: 1 }}>
        <GraphScrollArea>
          <GoalGraphContent />
        </GraphScrollArea>
      </GestureHandlerRootView>
    </GoalGraphContext.Provider>
  );
};
