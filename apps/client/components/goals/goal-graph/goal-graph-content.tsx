import { LayoutChangeEvent } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';

import { useGoalGraphContext } from './context';
import { GoalGraphList } from './goal-graph-list/goal-graph-list';
import { GoalGrid } from './goal-grid/goal-grid';
import { useGraphScrollContext } from './graph-scroll-area/context';

import { AnimatedStack } from '@/components/ui/animated-layout';

export const GoalGraphContent = () => {
  const goalGraphContext = useGoalGraphContext();
  const { scrollX, scrollY } = useGraphScrollContext();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: scrollX.value }, { translateY: scrollY.value }],
    };
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    goalGraphContext.settings.contentWidth.value = event.nativeEvent.layout.width;
    goalGraphContext.settings.contentHeight.value = event.nativeEvent.layout.height;
  };

  return (
    <AnimatedStack fg={1} onLayout={handleLayout} pos="relative" style={animatedStyle}>
      <GoalGrid />
      <GoalGraphList />
    </AnimatedStack>
  );
};
