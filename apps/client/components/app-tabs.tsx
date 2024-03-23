import {
  Plus as PlusIcon,
  MessageCircle as MessageIcon,
  User as UserIcon,
  Compass as CompassIcon,
  Home as HomeIcon,
} from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Stack, getTokens } from 'tamagui';

import { IconButton } from './ui/icon-button';
import { SafeAreaView } from './ui/safe-area-view';

import { useAuth } from '@/hooks/use-auth';
import { trpc } from '@/lib/trpc';

type Props = {
  activeTab: 'home' | 'discover' | 'create' | 'messages' | 'profile';
};

export const AppTabs = ({ activeTab }: Props) => {
  const router = useRouter();
  const { data: userInfo } = trpc.user.info.useQuery();
  const { logout } = useAuth();

  const handleHome = () => {
    router.push('/');
  };

  const handleCreate = () => {
    router.push('/create');
  };

  const handleProfile = () => {
    router.push(`/profile/${userInfo.id}`);
  };

  const handleDiscover = () => {
    router.push(`/discover`);
  };

  const handleLogout = () => {
    logout();
    router.push('/(auth)/');
  };

  return (
    <SafeAreaView pos="absolute" b={0} l={0} r={0} edges={['bottom']} px="$6">
      <Stack
        w="100%"
        bg="$backgroundBox"
        br="$12"
        px="$4"
        h={70}
        fd="row"
        jc="center"
        ai="center"
        gap="$6"
        shadowColor={getTokens().color.textPrimary}
        shadowOffset={{
          width: 0,
          height: 4,
        }}
        shadowOpacity={0.1}
        shadowRadius="$1">
        <IconButton
          variant="text"
          onPress={handleHome}
          icon={HomeIcon}
          disabled={activeTab === 'home'}
        />
        <IconButton
          variant="text"
          onPress={handleDiscover}
          icon={CompassIcon}
          disabled={activeTab === 'discover'}
        />
        <IconButton
          variant="text"
          onPress={handleCreate}
          bg="$primaryMain"
          w={60}
          h={60}
          icon={PlusIcon}
          mt={-30}
          disabled={activeTab === 'create'}
        />
        <IconButton
          variant="text"
          onPress={handleLogout}
          icon={MessageIcon}
          disabled={activeTab === 'messages'}
        />
        <IconButton
          variant="text"
          onPress={handleProfile}
          icon={UserIcon}
          disabled={activeTab === 'profile'}
        />
      </Stack>
    </SafeAreaView>
  );
};
