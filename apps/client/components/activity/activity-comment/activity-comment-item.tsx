import { NetworkActivityComment } from '@social-goal/server/src/routes/activity/comments/controller';

import { ActivityCommentCard } from './activity-comment-card/activity-comment-card';

interface Props {
  comment: NetworkActivityComment;
}

export const ActivityCommentItem = ({ comment }: Props) => {
  return (
    <ActivityCommentCard
      admin={{
        img: comment.user.image,
        name: comment.user.fullName,
      }}
      comments={comment.childComments}
      content={comment.content}
      likes={2}
      onPressLike={console.log}
      onPressComment={console.log}
    />
  );
};
