import { Avatar, Stack } from 'tamagui';

import { Text } from '../ui/text';

interface Props {
  image: string;
  fullName: string;
  id: number;
}

export const ProfileHeader = ({ fullName, id, image }: Props) => {
  return (
    <Stack w="100%" fd="row" gap="$2">
      <Avatar circular size={100}>
        <Avatar.Image accessibilityLabel="" src={image} />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <Stack f={1} jc="center" gap="$1">
        <Text variant="subtitle1">{fullName}</Text>
        <Text variant="subtitle2" color="$textSecondary">
          #{id}
        </Text>
      </Stack>
    </Stack>
  );
};
