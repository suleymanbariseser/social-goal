import { NetworkActivity } from '@app/server/src/routes/activity/controller';

import { ActivityCard } from './activity-card';

type Props = {
  activity: NetworkActivity;
  onPressAvatar: () => void;
  onPress: () => void;
  onLike: () => void;
};

export const ActivityListItem = ({ activity, onPressAvatar, onPress, onLike }: Props) => {
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
      likedByMe={activity.likedByMe}
      createdAt={activity.createdAt}
      shares={3}
      onPress={onPress}
      onPressAvatar={onPressAvatar}
      onPressComment={() => {}}
      onPressLike={onLike}
      onPressShare={() => {}}
    />
  );
};
