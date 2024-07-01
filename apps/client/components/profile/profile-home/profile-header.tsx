import { Stack } from 'tamagui';

import { Avatar } from '../../ui/avatar';
import { Text } from '../../ui/text';

interface Props {
  image: string;
  fullName: string;
  id: number;
}

export const ProfileHeader = ({ fullName, id, image }: Props) => {
  return (
    <Stack w="100%" fd="row" gap="$2">
      <Avatar size={100} accessibilityLabel={fullName} src={image} />
      <Stack f={1} jc="center" gap="$1">
        <Text variant="subtitle1">{fullName}</Text>
        <Text variant="subtitle2" color="$textSecondary">
          #{id}
        </Text>
      </Stack>
    </Stack>
  );
};
