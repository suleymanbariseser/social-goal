import { Stack } from 'tamagui';

import { ActivityList } from '@/components/activity';
import { DiscoverSearchOverlay } from '@/components/discover/discover-search/discover-search-overlay';

const Discover = () => {
  return (
    <Stack f={1} px="$2">
      <ActivityList onPress={console.log} onPressAvatar={console.log} />
      <DiscoverSearchOverlay />
    </Stack>
  );
};

export default Discover;
