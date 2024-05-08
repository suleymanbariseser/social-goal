import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { Stack } from 'tamagui';

import { ActivityCard, ActivityCommentInput, ActivityCommentList } from '@/components/activity';
import { AnimatedStack } from '@/components/ui/animated-layout';
import { Divider } from '@/components/ui/divider';
import { useLike } from '@/hooks/activity/use-like';
import { trpc } from '@/lib/trpc';

export default function Activity() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const likeActivity = useLike();
  const router = useRouter();
  const animatedKeyboard = useAnimatedKeyboard();

  const { data: activity } = trpc.activity.activityWithId.useQuery(
    { id: +id },
    {
      enabled: !!id,
    }
  );

  const handlePressAvatar = () => {
    router.push(`/profile/${activity?.creator.id}`);
  };

  const styles = useAnimatedStyle(() => {
    return {
      // 120 is the height of the comment input
      paddingBottom: animatedKeyboard.height.value + 120,
    };
  });

  if (!activity) return null;

  return (
    <AnimatedStack f={1} px="$2" style={styles}>
      <ActivityCommentList
        header={
          <Stack>
            <ActivityCard
              goal={{
                id: activity.goal.id,
                title: activity.goal.title,
              }}
              admin={{
                name: activity.creator.fullName,
                img: activity.creator.image,
              }}
              comments={activity.comments}
              content={activity.content}
              likes={activity.likes}
              shares={3}
              assets={activity.assets}
              onPressAvatar={handlePressAvatar}
              onPressLike={() => likeActivity(+id)}
              likedByMe={false}
            />
            <Divider />
          </Stack>
        }
        activityId={+id}
      />
      <ActivityCommentInput />
    </AnimatedStack>
  );
}
