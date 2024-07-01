import { useRouter } from 'expo-router';
import { Stack } from 'tamagui';

import { Text } from '../../ui/text';

type ProfileLinkProps = {
  count: number;
  text: string;
  onPress?: () => void;
};

const ProfileLink = ({ count, text, onPress }: ProfileLinkProps) => {
  return (
    <Text variant="body3" onPress={onPress}>
      {count}{' '}
      <Text variant="body3" color="$textSecondary">
        {text}
      </Text>
    </Text>
  );
};

interface Props {
  id: number;
  goals: number;
  followers: number;
  following: number;
}

export const ProfileStatistics = ({ id, followers, following, goals }: Props) => {
  const router = useRouter();

  const handleGoalPress = () => {
    router.push(`/profile/${id}/(tabs)/followers`);
  };

  return (
    <Stack fd="row" gap="$2">
      <ProfileLink count={goals} text="goals" onPress={handleGoalPress} />
      <Text variant="body3">-</Text>
      <ProfileLink count={followers} text="followers" />
      <Text variant="body3">-</Text>
      <ProfileLink count={following} text="following" />
    </Stack>
  );
};
