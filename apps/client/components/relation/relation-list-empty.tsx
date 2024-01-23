import { Stack } from 'tamagui';

import { Text } from '../ui/text';

type Props = {
  text: string;
};

export const RelationListEmpty = ({ text }: Props) => {
  return (
    <Stack p="$4" ai="center">
      <Text col="$textSecondary">{text}</Text>
    </Stack>
  );
};
