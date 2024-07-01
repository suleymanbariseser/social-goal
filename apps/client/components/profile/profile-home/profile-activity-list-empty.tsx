import { Link } from 'expo-router';
import { Stack } from 'tamagui';

import { Text } from '../../ui/text';

import { useAuth } from '@/hooks/use-auth';

type Props = {
  userId: number;
};

export const ProfileActivityListEmpty = ({ userId }: Props) => {
  const { user } = useAuth();

  return (
    <Stack ai="center" gap="$4">
      <Text variant="subtitle1" ta="center">
        No activities found
      </Text>
      {user?.id === userId && (
        <Text variant="body2">
          <Text variant="body2" col="$primaryMain">
            <Link href="/create">Create</Link>
          </Text>{' '}
          a goal to get started
        </Text>
      )}
    </Stack>
  );
};
