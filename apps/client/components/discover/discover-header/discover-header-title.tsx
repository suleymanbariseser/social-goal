import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useState } from 'react';
import { PortalItem, Stack } from 'tamagui';

import { DiscoverSearchInput } from '../discover-search/discover-search-input';
import { DiscoverSearchOverlay } from '../discover-search/discover-search-overlay';

import { DISCOVER_SEARCH_OVERLAY } from '@/constants/discover';

export const DiscoverHeaderTitle = () => {
  const { q } = useLocalSearchParams<{ q: string }>();
  const [search, setSearch] = useState(q);
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const isScreenFocused = useNavigation().isFocused();

  const handleSubmit = (value: string) => {
    router.push('/discover?q=' + value);
  };

  return (
    <Stack fg={1}>
      <DiscoverSearchInput
        value={search}
        onSubmit={handleSubmit}
        isFocused={isFocused}
        onFocusChange={setIsFocused}
        onChangeText={setSearch}
      />
      {isScreenFocused && (
        <PortalItem hostName={DISCOVER_SEARCH_OVERLAY}>
          <DiscoverSearchOverlay isFocused={isFocused} q={search} />
        </PortalItem>
      )}
    </Stack>
  );
};
