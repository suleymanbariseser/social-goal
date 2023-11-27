import { NetworkActivity } from '@social-goal/server/src/routes/activity/controller';
import { useToastController } from '@tamagui/toast';

import ActivityCard from '../activity-card/activity-card';

import { trpc } from '@/lib/trpc';

type Props = {
  activity: NetworkActivity;
  onPressAvatar: () => void;
};

export const ActivityListItem = ({ activity, onPressAvatar }: Props) => {
  const { mutate: like } = trpc.activity.likes.likeById.useMutation();
  const toast = useToastController();

  const handlePressLike = () => {
    like(
      { id: activity.id },
      {
        onSuccess: () => {
          // TODO sync state and show like animation
        },
        onError: (error) => {
          toast.show(error.message, {
            variant: 'error',
          });
        },
      }
    );
  };

  return (
    <ActivityCard
      admin={{
        img: activity.creator.image,
        name: activity.creator.fullName,
      }}
      content={activity.content}
      goal={activity.goal.title}
      comments={activity.comments}
      likes={activity.likes}
      shares={3}
      onPressAvatar={onPressAvatar}
      onPressComment={() => {}}
      onPressLike={handlePressLike}
      onPressShare={() => {}}
    />
  );
};
