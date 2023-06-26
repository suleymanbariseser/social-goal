import { Stack } from 'tamagui';

import Button from '@/components/ui/button';
import Text from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/lib/trpc';

const Home = () => {
  const { data: user } = trpc.user.info.useQuery();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Stack gap="$4">
      <Text variant="headline1">
        Hello ${user?.firstName} ${user?.lastName}
      </Text>
      <Button onPress={handleLogout}>Logout</Button>
    </Stack>
  );
};

export default Home;
