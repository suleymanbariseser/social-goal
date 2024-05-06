import { EvilIcons } from '@expo/vector-icons';
import { MessageCircle, ThumbsUp } from '@tamagui/lucide-icons';
import { Card, getTokens } from 'tamagui';

import { Button } from '@/components/ui/button';

export type ActivityCardFooterProps = {
  comments: number;
  likes: number;
  shares: number;
  likedByMe: boolean;

  onPressComment?: () => void;
  onPressLike?: () => void;
  onPressShare?: () => void;
};

export const ActivityCardFooter = ({
  comments,
  likes,
  shares,
  likedByMe,
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
        startAdornment={<MessageCircle size="$4" />}>
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
        textProps={{
          color: likedByMe ? '$primaryMain' : '$textPrimary',
        }}
        startAdornment={<ThumbsUp size="$4" color={likedByMe ? '$primaryMain' : '$textPrimary'} />}>
        {likes}
      </Button>
    </Card.Footer>
  );
};
