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

interface Props {
  goals: number;
  followers: number;
  following: number;
}

export const ProfileStatistics = ({ followers, following, goals }: Props) => {
  return (
    <Stack fd="row" gap="$2">
      <ProfileLink count={goals} text="goals" />
      <Text variant="body3">-</Text>
      <ProfileLink count={followers} text="followers" />
      <Text variant="body3">-</Text>
      <ProfileLink count={following} text="following" />
    </Stack>
  );
};
