import Animated from 'react-native-reanimated';
import { ScrollView, Stack } from 'tamagui';

import { SafeAreaView } from './safe-area-view';

export const AnimatedStack = Animated.createAnimatedComponent(Stack);
export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
export const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
