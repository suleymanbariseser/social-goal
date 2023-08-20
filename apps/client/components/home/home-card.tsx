import { EvilIcons } from '@expo/vector-icons';
import { Avatar, Card, Stack, getTokens } from 'tamagui';

import { Button } from '../ui/button';
import { Text } from '../ui/text';

interface Props {
  admin: {
    name: string;
    img: string;
  };
  goal: string;
  content: string;
  onPressAvatar: () => void;
}

export default function HomeCard({ admin, content, goal, onPressAvatar }: Props) {
  return (
    <Card p="$3" gap="$3" bordered transparent>
      <Card.Header fd="row" gap="$2">
        <Avatar circular size="$10">
          <Avatar.Image accessibilityLabel={admin.name} src={admin.img} onPress={onPressAvatar} />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <Stack fd="row" gap="$1" ai="center">
          <Text variant="subtitle1">{admin.name}</Text>
          <Text variant="subtitle1" color="$textSecondary">
            #{goal.replace(/[ ]/g, '')}
          </Text>
        </Stack>
      </Card.Header>
      <Stack>
        <Text variant="body1">{content}</Text>
      </Stack>
      <Card.Footer fd="row">
        <Button
          variant="text"
          px="$0"
          py="$0"
          f={1}
          jc="flex-start"
          startAdornment={
            <EvilIcons name="comment" size={24} color={getTokens().color.textPrimary.val} />
          }>
          12
        </Button>
        <Button
          variant="text"
          px="$0"
          py="$0"
          f={1}
          jc="flex-start"
          startAdornment={
            <EvilIcons name="retweet" size={24} color={getTokens().color.textPrimary.val} />
          }>
          2
        </Button>
        <Button
          variant="text"
          px="$0"
          py="$0"
          f={1}
          jc="flex-start"
          startAdornment={
            <EvilIcons name="like" size={24} color={getTokens().color.textPrimary.val} />
          }>
          5
        </Button>
      </Card.Footer>
    </Card>
  );
}
