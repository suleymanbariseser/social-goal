import { Card } from 'tamagui';

import {
  ActivityCommentCardContent,
  ActivityCommentCardContentProps,
} from './activity-comment-card-content';
import {
  ActivityCommentCardFooter,
  ActivityCommentCardFooterProps,
} from './activity-comment-card-footer';
import {
  ActivityCommentCardHeader,
  ActivityCommentCardHeaderProps,
} from './activity-comment-card-header';

type Props = ActivityCommentCardHeaderProps &
  ActivityCommentCardContentProps &
  ActivityCommentCardFooterProps;

export const ActivityCommentCard = ({
  admin,
  content,
  comments,
  likes,
  likedByMe,
  createdAt,
  onPressComment,
  onPressLike,
}: Props) => (
  <Card p="$3" gap="$3" transparent boc="$transparent" onPress={console.log}>
    <ActivityCommentCardHeader admin={admin} createdAt={createdAt} />
    <ActivityCommentCardContent content={content} />
    <ActivityCommentCardFooter
      comments={comments}
      likes={likes}
      likedByMe={likedByMe}
      onPressComment={onPressComment}
      onPressLike={onPressLike}
    />
  </Card>
);
