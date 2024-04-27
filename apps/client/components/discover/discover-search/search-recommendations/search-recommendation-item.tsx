import { UserSearchRecommendation } from '@app/server/src/routes/search/controller';
import { useRouter } from 'expo-router';
import { Stack } from 'tamagui';

import { Avatar } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

type Props = {
  user: UserSearchRecommendation;
};

export const SearchRecommendationItem = ({ user }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/profile/${user.id}`);
  };

  return (
    <Stack fd="row" gap="$2" px="$4" onPress={handlePress}>
      <Avatar accessibilityLabel={user.fullName} src={user.image} onPress={console.log} />
      <Stack fd="row" gap="$1" ai="center">
        <Text variant="subtitle1">{user.fullName}</Text>
      </Stack>
    </Stack>
  );
};
