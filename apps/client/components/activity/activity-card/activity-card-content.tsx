import { Stack } from 'tamagui';

import { Text } from '@/components/ui/text';

export type ActivityCardContentProps = {
  content: string;
};
export const ActivityCardContent = ({ content }: ActivityCardContentProps) => {
  return (
    <Stack>
      <Text variant="body1">{content}</Text>
    </Stack>
  );
};
