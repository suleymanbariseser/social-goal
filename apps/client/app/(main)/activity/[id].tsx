import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'tamagui';

import { ActivityCommentList } from '@/components/activity/activity-comment/activity-comment-list';
import ActivityCard from '@/components/activity/activity-list/activity-card/activity-card';
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
    <Stack f={1}>
      <ActivityCommentList
        header={
          <ActivityCard
            goal={activity.goal.title}
            admin={{
              name: activity.creator.fullName,
              img: activity.creator.image,
            }}
            comments={activity.comments}
            content={activity.content}
            likes={activity.likes}
            shares={3}
            onPressAvatar={handlePressAvatar}
            onPressLike={likeActivity}
          />
        }
        activityId={+id}
      />
    </Stack>
  );
}
