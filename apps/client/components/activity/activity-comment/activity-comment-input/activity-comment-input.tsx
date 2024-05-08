import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedSafeAreaView } from '@/components/ui/animated-layout';
import { BaseInput } from '@/components/ui/form/input';

export const ActivityCommentInput = () => {
  const animatedKeyboard = useAnimatedKeyboard();
  const insets = useSafeAreaInsets();

  const styles = useAnimatedStyle(() => {
    return {
      bottom: animatedKeyboard.height.value,
    };
  }, [insets.bottom]);

  return (
    <AnimatedSafeAreaView
      style={styles}
      edges={['bottom']}
      pos="absolute"
      b={0}
      l={0}
      r={0}
      bg="$backgroundMain"
      px="$2"
      pt="$4"
      btw={1}
      btc="$borderColor">
      <BaseInput placeholder="Leave a comment..." />
    </AnimatedSafeAreaView>
  );
};
