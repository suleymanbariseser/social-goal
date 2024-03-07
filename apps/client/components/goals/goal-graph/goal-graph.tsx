import { useState } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import { FocusedDetails, GoalGraphContext } from './context';
import { GoalGraphContent } from './goal-graph-content';
import { GraphScrollArea } from './graph-scroll-area/graph-scroll-area';

type Props = {
  id: string;
  startDate: Date;
  endDate: Date;
};

export const GoalsGraph = ({ id, startDate, endDate }: Props) => {
  const gridWidth = useSharedValue(Dimensions.get('window').width);
  const gridHeight = useSharedValue(Dimensions.get('window').height);
  const contentWidth = useSharedValue(Dimensions.get('window').width);
  const contentHeight = useSharedValue(Dimensions.get('window').height);

  const [focusedDetails, setFocusedDetails] = useState<FocusedDetails | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    gridWidth.value = event.nativeEvent.layout.width;
    gridHeight.value = event.nativeEvent.layout.height;
  };

  return (
    <GoalGraphContext.Provider
      value={{
        id: +id,
        settings: {
          dayWidth: 50,
          goalHeight: 50,
          gridWidth,
          gridHeight,
          contentWidth,
          contentHeight,
        },
        startDate,
        endDate,
        focusedDetails,
        setFocusedDetails,
      }}>
      <GestureHandlerRootView onLayout={handleLayout} style={{ flex: 1 }}>
        <GraphScrollArea>
          <GoalGraphContent />
        </GraphScrollArea>
      </GestureHandlerRootView>
    </GoalGraphContext.Provider>
  );
};
