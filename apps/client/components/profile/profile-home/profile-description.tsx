import { Stack } from 'tamagui';

import { Text } from '../../ui/text';

interface Props {
  description: string;
}

export const ProfileDescription = ({ description }: Props) => {
  return (
    <Stack w="100%">
      <Text variant="body3">{description ?? '-'}</Text>
    </Stack>
  );
};
