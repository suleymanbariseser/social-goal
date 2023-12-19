import { BaseInput } from '@/components/ui/form/input';
import { SafeAreaView } from '@/components/ui/safe-area-view';

export const ActivityCommentInput = () => {
  return (
    <SafeAreaView
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
    </SafeAreaView>
  );
};
