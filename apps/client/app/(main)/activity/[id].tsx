import { useLocalSearchParams } from 'expo-router';

import ActivityCard from '@/components/activity/activity-card/activity-card';
import { useLikeActivity } from '@/hooks/activity/use-like-activity';
import { trpc } from '@/lib/trpc';

export default function Activity() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const likeActivity = useLikeActivity({ id: +id });

  const { data: activity } = trpc.activity.activityWithId.useQuery(
    { id: +id },
    {
      enabled: !!id,
    }
  );

  if (!activity) return null;

  return (
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
      onPress={console.log}
      onPressAvatar={console.log}
      onPressComment={console.log}
      onPressLike={likeActivity}
      onPressShare={console.log}
    />
  );
}
