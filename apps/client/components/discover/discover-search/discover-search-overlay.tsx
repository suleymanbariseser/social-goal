import { useStore } from 'zustand';

import { SearchResult } from './search-result';

import { Overlay } from '@/components/ui/overlay';
import { discoverStore } from '@/store/discover';

export const DiscoverSearchOverlay = () => {
  const { isSearchFocused } = useStore(discoverStore);

  return (
    <Overlay bg="$backgroundMain" open={isSearchFocused}>
      <SearchResult />
    </Overlay>
  );
};
