import { EvilIcons } from '@expo/vector-icons';
import { Card, getTokens } from 'tamagui';

import { Button } from '@/components/ui/button';

export type ActivityCardFooterProps = {
  comments: number;
  likes: number;
  shares: number;

  onPressComment?: () => void;
  onPressLike?: () => void;
  onPressShare?: () => void;
};

export const ActivityCardFooter = ({
  comments,
  likes,
  shares,
  onPressLike,
  onPressComment,
  onPressShare,
}: ActivityCardFooterProps) => {
  return (
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
        onPress={onPressShare}
        startAdornment={
          <EvilIcons name="retweet" size={24} color={getTokens().color.textPrimary.val} />
        }>
        {shares}
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
};
