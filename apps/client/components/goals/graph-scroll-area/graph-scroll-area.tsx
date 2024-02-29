import moment from 'moment';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { GraphScrollContext } from './context';
import { useGoalGraphContext } from '../context';

type Props = {
  children: React.ReactNode;
};

export const GraphScrollArea = ({ children }: Props) => {
  const { endDate, startDate, settings } = useGoalGraphContext();

  const dayDiff = moment(endDate).diff(moment(startDate), 'days') + 1;

  const scrollableWidth = useDerivedValue(() => {
    return dayDiff * settings.dayWidth - settings.gridWidth.value;
  }, [dayDiff, settings.dayWidth, settings.gridWidth]);

  const scrollableHeight = useDerivedValue(() => {
    return settings.contentHeight.value - settings.gridHeight.value;
  }, [settings.contentHeight, settings.gridHeight]);

  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const ctxX = useSharedValue(0);
  const ctxY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      ctxX.value = scrollX.value;
      ctxY.value = scrollY.value;
    })
    .onUpdate((data) => {
      scrollX.value = data.translationX + ctxX.value;
      scrollY.value = data.translationY + ctxY.value;

      if (scrollX.value > 0) {
        scrollX.value = 0;
      }
      if (scrollY.value > 0) {
        scrollY.value = 0;
      }

      if (scrollX.value < -scrollableWidth.value) {
        scrollX.value = -scrollableWidth.value;
      }
      if (scrollY.value < -scrollableHeight.value) {
        scrollY.value = -scrollableHeight.value;
      }
    })
    .onEnd(() => {});

  return (
    <GraphScrollContext.Provider value={{ scrollX, scrollY }}>
      <GestureDetector gesture={gesture}>{children}</GestureDetector>
    </GraphScrollContext.Provider>
  );
};
