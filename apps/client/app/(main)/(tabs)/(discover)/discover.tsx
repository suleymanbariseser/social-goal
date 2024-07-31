import { PortalHost, Stack } from 'tamagui';

import { ActivityList } from '@/components/activity';
import { DISCOVER_SEARCH_OVERLAY } from '@/constants/discover';

const Discover = () => (
  <Stack f={1} px="$2" pt="$4">
    <PortalHost name={DISCOVER_SEARCH_OVERLAY} />
    <ActivityList onPress={console.log} onPressAvatar={console.log} />
  </Stack>
);

export default Discover;
