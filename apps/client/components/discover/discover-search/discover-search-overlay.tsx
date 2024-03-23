import { useStore } from 'zustand';

import { Overlay } from '@/components/ui/overlay';
import { Text } from '@/components/ui/text';
import { discoverStore } from '@/store/discover';

export const DiscoverSearchOverlay = () => {
  const { isSearchFocused } = useStore(discoverStore);

  return (
    <Overlay bg="$backgroundMain" open={isSearchFocused}>
      <Text>Search result</Text>
    </Overlay>
  );
};
