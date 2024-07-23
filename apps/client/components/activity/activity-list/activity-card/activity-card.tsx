import { Card } from 'tamagui';

import { ActivityCardContent, ActivityCardContentProps } from './activity-card-content';
import { ActivityCardFooter, ActivityCardFooterProps } from './activity-card-footer';
import { ActivityCardHeader, ActivityCardHeaderProps } from './activity-card-header';

type Props = ActivityCardHeaderProps &
  ActivityCardContentProps &
  ActivityCardFooterProps & {
    onPress?: () => void;
    bordered?: boolean;
  };

export function ActivityCard({
  admin,
  content,
  goal,
  comments,
  likes,
  shares,
  assets,
  likedByMe,
  onPress,
  onPressAvatar,
  onPressComment,
  onPressLike,
  onPressSettings,
  createdAt,
  bordered = false,
}: Props) {
  return (
    <Card
      p="$3"
      gap="$3"
      transparent
      bordered={bordered}
      boc={bordered ? '$borderColor' : '$transparent'}
      onPress={onPress}>
      <ActivityCardHeader
        admin={admin}
        goal={goal}
        onPressAvatar={onPressAvatar}
        createdAt={createdAt}
        onPressSettings={onPressSettings}
      />
      <ActivityCardContent content={content} assets={assets} />
      <ActivityCardFooter
        comments={comments}
        likes={likes}
        shares={shares}
        likedByMe={likedByMe}
        onPressLike={onPressLike}
        onPressComment={onPressComment}
      />
    </Card>
  );
}
