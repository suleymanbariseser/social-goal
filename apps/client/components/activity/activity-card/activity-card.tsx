import { Card } from 'tamagui';

import { ActivityCardContent, ActivityCardContentProps } from './activity-card-content';
import { ActivityCardFooter, ActivityCardFooterProps } from './activity-card-footer';
import { ActivityCardHeader, ActivityCardHeaderProps } from './activity-card-header';

type Props = ActivityCardHeaderProps & ActivityCardContentProps & ActivityCardFooterProps;

export default function ActivityCard({
  admin,
  content,
  goal,
  onPressAvatar,
  comments,
  likes,
  shares,
  onPressComment,
  onPressLike,
  onPressShare,
}: Props) {
  return (
    <Card p="$3" gap="$3" bordered transparent>
      <ActivityCardHeader admin={admin} goal={goal} onPressAvatar={onPressAvatar} />
      <ActivityCardContent content={content} />
      <ActivityCardFooter
        comments={comments}
        likes={likes}
        shares={shares}
        onPressLike={onPressLike}
        onPressComment={onPressComment}
        onPressShare={onPressShare}
      />
    </Card>
  );
}
