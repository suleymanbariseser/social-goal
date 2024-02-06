import { MessageCircle, ThumbsUp } from '@tamagui/lucide-icons';
import { Card } from 'tamagui';

import { Button } from '@/components/ui/button';

export type ActivityCommentCardFooterProps = {
  comments: number;
  likes: number;
  onPressComment: () => void;
  onPressLike: () => void;
};

export const ActivityCommentCardFooter = ({
  comments,
  likes,
  onPressComment,
  onPressLike,
}: ActivityCommentCardFooterProps) => (
  <Card.Footer fd="row">
    <Button
      variant="text"
      px="$0"
      py="$0"
      f={1}
      jc="flex-start"
      onPress={onPressComment}
      startAdornment={<MessageCircle size="$4" />}>
      {comments}
    </Button>
    <Button
      variant="text"
      px="$0"
      py="$0"
      f={1}
      jc="flex-start"
      onPress={onPressLike}
      startAdornment={<ThumbsUp size="$4" />}>
      {likes}
    </Button>
  </Card.Footer>
);
