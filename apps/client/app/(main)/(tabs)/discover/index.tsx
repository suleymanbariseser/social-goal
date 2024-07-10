import { PortalHost, Stack } from 'tamagui';

import { DiscoverContent } from '@/components/discover/discover-content/discover-content';
import { DISCOVER_SEARCH_OVERLAY } from '@/constants/discover';

const Discover = () => {
  return (
    <Stack f={1} px="$2" pt="$4">
      <PortalHost name={DISCOVER_SEARCH_OVERLAY} />
      <DiscoverContent />
    </Stack>
  );
};

export default Discover;
