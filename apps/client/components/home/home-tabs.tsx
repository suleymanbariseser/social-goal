import { useRouter } from 'expo-router';
import { Stack, getTokens } from 'tamagui';

import IconButton from '../ui/icon-button';
import SafeAreaView from '../ui/safe-area-view';

import AddIcon from '@/assets/icons/add.svg';
import HomeIcon from '@/assets/icons/home.svg';
import MessageIcon from '@/assets/icons/message.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import SearchIcon from '@/assets/icons/search.svg';

export default function HomeTabs() {
  const router = useRouter();
  const handleCreate = () => {
    router.push('/create');
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
        <IconButton variant="text" icon={HomeIcon} />
        <IconButton variant="text" icon={SearchIcon} />
        <IconButton
          variant="text"
          onPress={handleCreate}
          bg="$primaryMain"
          w={60}
          h={60}
          icon={AddIcon}
          mt={-30}
        />
        <IconButton variant="text" icon={MessageIcon} />
        <IconButton variant="text" icon={ProfileIcon} />
      </Stack>
    </SafeAreaView>
  );
}
