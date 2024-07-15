import { XStack } from 'tamagui';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

type Props = {
  image: string;
  fullName: string;
};

export const UserListItemContent = ({ fullName, image }: Props) => (
  <XStack f={1} gap="$2" ai="center">
    <Avatar src={image} />
    <Text>{fullName}</Text>
  </XStack>
);
