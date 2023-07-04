import { Stack } from 'tamagui';

import IconButton from '../ui/icon-button';
import SafeAreaView from '../ui/safe-area-view';

import HomeIcon from '@/assets/icons/home.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import SearchIcon from '@/assets/icons/search.svg';

export default function HomeTabs() {
  return (
    <SafeAreaView pos="absolute" b={0} l={0} r={0} edges={['bottom']} px="$6">
      <Stack w="100%" bg="$backgroundBox" br="$12" p="$4" fd="row" jc="center" ai="center" gap="$6">
        <IconButton variant="text" icon={HomeIcon} />
        <IconButton variant="text" icon={SearchIcon} />
        <IconButton variant="text" icon={ProfileIcon} />
      </Stack>
    </SafeAreaView>
  );
}
