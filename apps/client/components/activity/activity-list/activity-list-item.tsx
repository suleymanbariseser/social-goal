import { NetworkActivity } from '@app/server/src/routes/activity/controller';

import { ActivityCard } from './activity-card';

import { useLikeActivity } from '@/hooks/activity/use-like-activity';

type Props = {
  activity: NetworkActivity;
  onPressAvatar: () => void;
  onPress: () => void;
};

export const ActivityListItem = ({ activity, onPressAvatar, onPress }: Props) => {
  const likeActivity = useLikeActivity({ id: activity.id });

  return (
    <ActivityCard
      bordered
      admin={{
        img: activity.creator.image,
        name: activity.creator.fullName,
      }}
      content={activity.content}
      goal={{
        id: activity.goal.id,
        title: activity.goal.title,
      }}
      comments={activity.comments}
      likes={activity.likes}
      assets={activity.assets}
      shares={3}
      onPress={onPress}
      onPressAvatar={onPressAvatar}
      onPressComment={() => {}}
      onPressLike={likeActivity}
      onPressShare={() => {}}
    />
  );
};
