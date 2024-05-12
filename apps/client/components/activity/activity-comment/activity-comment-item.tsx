import { NetworkActivityComment } from '@app/server/src/routes/activity/comments/controller';

import { ActivityCommentCard } from './activity-comment-card/activity-comment-card';

interface Props {
  comment: NetworkActivityComment;
  onPressLike: () => void;
  onPressComment: () => void;
}

export const ActivityCommentItem = ({ comment, onPressLike, onPressComment }: Props) => {
  return (
    <ActivityCommentCard
      admin={{
        img: comment.user.image,
        name: comment.user.fullName,
      }}
      comments={comment.childComments}
      content={comment.content}
      likes={comment.likes}
      likedByMe={comment.likedByMe}
      onPressLike={onPressLike}
      onPressComment={onPressComment}
    />
  );
};
