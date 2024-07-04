import { useRef } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputSubmitEditingEventData } from 'react-native';
import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner } from 'tamagui';

import { AnimatedStack } from '@/components/ui/animated-layout';
import { BaseInput } from '@/components/ui/form/input';
import { useCreateComment } from '@/hooks/activity/comment/use-create-comment';
import { trpc } from '@/lib/trpc';

type Props = {
  activityId: number;
  parentCommentId?: number;
};

export const ActivityCommentInput = ({ activityId, parentCommentId }: Props) => {
  const animatedKeyboard = useAnimatedKeyboard();
  const insets = useSafeAreaInsets();
  const [createComment, { isLoading }] = useCreateComment();
  const utils = trpc.useUtils();
  const inputRef = useRef<TextInput>(null);

  const styles = useAnimatedStyle(() => {
    return {
      bottom: animatedKeyboard.height.value,
    };
  }, [insets.bottom]);

  const handleSubmitComment = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    if (isLoading) return;

    const content = e.nativeEvent.text;

    createComment(
      {
        content,
        activityId,
        parentCommentId,
      },
      {
        onSuccess() {
          inputRef.current.clear();
          // A temp solution. Later, we will have subscriptions to update the comments list
          utils.activity.comments.list.invalidate({
            activityId,
            parentCommentId,
          });
          utils.activity.activityWithId.setData(
            {
              id: activityId,
            },
            (oldData) => {
              return {
                ...oldData,
                comments: oldData.comments + 1,
              };
            }
          );
        },
      }
    );
  };

  return (
    <AnimatedStack
      style={styles}
      pos="absolute"
      b={0}
      l={0}
      r={0}
      bg="$backgroundMain"
      px="$2"
      py="$4"
      btw={1}
      btc="$borderColor">
      <BaseInput
        ref={inputRef}
        placeholder="Leave a comment..."
        onSubmitEditing={handleSubmitComment}
        disabled={isLoading}
        endAdornment={isLoading && <Spinner />}
      />
    </AnimatedStack>
  );
};
