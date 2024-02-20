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

  const dayDiff = moment(endDate).diff(moment(startDate), 'days');

  const totalWidth = useDerivedValue(() => {
    return dayDiff * settings.dayWidth - settings.gridWidth.value;
  }, [dayDiff, settings.dayWidth, settings.gridWidth]);

  const startX = useSharedValue(0);
  const ctxX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      ctxX.value = startX.value;
    })
    .onUpdate((data) => {
      startX.value = data.translationX + ctxX.value;

      if (startX.value > 0) {
        startX.value = 0;
      }

      if (startX.value < -totalWidth.value) {
        startX.value = -totalWidth.value;
      }
    })
    .onEnd(() => {});

  return (
    <GraphScrollContext.Provider value={{ startX }}>
      <GestureDetector gesture={gesture}>{children}</GestureDetector>
    </GraphScrollContext.Provider>
  );
};
