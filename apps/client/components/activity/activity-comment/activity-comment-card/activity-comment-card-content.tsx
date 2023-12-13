import { Stack } from 'tamagui';

import { Text } from '@/components/ui/text';

export type ActivityCommentCardContentProps = {
  content: string;
};

export const ActivityCommentCardContent = ({ content }: ActivityCommentCardContentProps) => (
  <Stack>
    <Text variant="body1">{content}</Text>
  </Stack>
);
