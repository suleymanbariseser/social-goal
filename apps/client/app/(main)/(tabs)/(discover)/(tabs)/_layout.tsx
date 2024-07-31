import { PortalHost, Stack } from 'tamagui';

import { TopTab } from '@/components/top-tab';
import { DISCOVER_SEARCH_OVERLAY } from '@/constants/discover';

const SearchTabs = () => {
  return (
    <Stack f={1} px="$2" pt="$4">
      <PortalHost name={DISCOVER_SEARCH_OVERLAY} />
      <TopTab>
        <TopTab.Screen name="users" />
        <TopTab.Screen name="activities" />
        <TopTab.Screen name="goals" />
      </TopTab>
    </Stack>
  );
};

export default SearchTabs;
