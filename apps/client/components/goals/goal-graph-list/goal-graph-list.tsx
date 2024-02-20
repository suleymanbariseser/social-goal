import moment from 'moment';
import { useRef } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Stack } from 'tamagui';

import { GoalGraphListItem } from './goal-graph-list-item';
import { useGoalGraphContext } from '../context';
import { useGraphScrollContext } from '../graph-scroll-area/context';

const AnimatedStack = Animated.createAnimatedComponent(Stack);

export const GoalGraphList = () => {
  const { settings } = useGoalGraphContext();
  const { startX } = useGraphScrollContext();

  const items = useRef([
    {
      start: moment().add(1, 'd').toDate(),
      end: moment().add(10, 'd').toDate(),
    },
    {
      start: moment().add(12, 'd').toDate(),
      end: moment().add(1, 'M').toDate(),
    },
    {
      start: moment().add(4, 'd').toDate(),
      end: moment().add(8, 'd').toDate(),
    },
  ]).current;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: startX.value }],
    };
  });

  return (
    <AnimatedStack fd="column" gap="$2" pt="$11" pl={settings.dayWidth / 2} style={animatedStyle}>
      {items.map((item, index) => (
        <GoalGraphListItem key={index} start={item.start} end={item.end} />
      ))}
    </AnimatedStack>
  );
};
