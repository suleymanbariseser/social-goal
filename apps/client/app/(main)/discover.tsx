import { Stack } from 'tamagui';

import { AppTabs } from '@/components/app-tabs';
import { DiscoverSearchOverlay } from '@/components/discover/discover-search/discover-search-overlay';
import { DiscoverTabs } from '@/components/discover/discover-tabs/discover-tabs';

const Discover = () => {
  return (
    <Stack f={1} px="$2">
      <DiscoverTabs />
      <DiscoverSearchOverlay />
      <AppTabs activeTab="discover" />
    </Stack>
  );
};

export default Discover;
