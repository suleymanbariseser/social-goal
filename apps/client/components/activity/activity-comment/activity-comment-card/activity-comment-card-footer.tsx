import { EvilIcons } from '@expo/vector-icons';
import { Card, getTokens } from 'tamagui';

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
      startAdornment={
        <EvilIcons name="comment" size={24} color={getTokens().color.textPrimary.val} />
      }>
      {comments}
    </Button>
    <Button
      variant="text"
      px="$0"
      py="$0"
      f={1}
      jc="flex-start"
      onPress={onPressLike}
      startAdornment={
        <EvilIcons name="like" size={24} color={getTokens().color.textPrimary.val} />
      }>
      {likes}
    </Button>
  </Card.Footer>
);
