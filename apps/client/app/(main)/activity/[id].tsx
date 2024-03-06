import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'tamagui';

import { ActivityCard, ActivityCommentInput, ActivityCommentList } from '@/components/activity';
import { Divider } from '@/components/ui/divider';
import { useLikeActivity } from '@/hooks/activity/use-like-activity';
import { trpc } from '@/lib/trpc';

export default function Activity() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const likeActivity = useLikeActivity({ id: +id });
  const router = useRouter();

  const { data: activity } = trpc.activity.activityWithId.useQuery(
    { id: +id },
    {
      enabled: !!id,
    }
  );

  const handlePressAvatar = () => {
    router.push(`/profile/${activity?.creator.id}`);
  };

  if (!activity) return null;

  return (
    <Stack f={1} px="$2">
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
              onPressLike={likeActivity}
            />
            <Divider />
          </Stack>
        }
        activityId={+id}
      />
      <ActivityCommentInput />
    </Stack>
  );
}
