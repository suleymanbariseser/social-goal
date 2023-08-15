import { Avatar, Stack } from 'tamagui';

import { Text } from '../ui/text';

export const ProfileHeader = () => {
  return (
    <Stack w="100%" fd="row" gap="$2">
      <Avatar circular size={100}>
        <Avatar.Image accessibilityLabel="" src="" />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <Stack f={1} jc="center" gap="$1">
        <Text variant="subtitle1">Süleyman Barış Eser</Text>
        <Text variant="subtitle2" color="$textSecondary">
          #5324231
        </Text>
      </Stack>
    </Stack>
  );
};
