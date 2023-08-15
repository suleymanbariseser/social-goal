import { Stack } from 'tamagui';

import { Text } from '../ui/text';

type ProfileLinkProps = {
  count: number;
  text: string;
};

const ProfileLink = ({ count, text }: ProfileLinkProps) => {
  return (
    <Text variant="body3">
      {count}{' '}
      <Text variant="body3" color="$textSecondary">
        {text}
      </Text>
    </Text>
  );
};

export const ProfileStatistics = () => {
  return (
    <Stack fd="row" gap="$2">
      <ProfileLink count={2} text="goals" />
      <Text variant="body3">-</Text>
      <ProfileLink count={4} text="followers" />
      <Text variant="body3">-</Text>
      <ProfileLink count={8} text="following" />
    </Stack>
  );
};
