import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import { PortalItem, Stack } from 'tamagui';

import { DiscoverSearchInput } from '../discover-search/discover-search-input';
import { DiscoverSearchOverlay } from '../discover-search/discover-search-overlay';

import { DISCOVER_SEARCH_OVERLAY } from '@/constants/discover';

export const DiscoverHeaderTitle = () => {
  const inputRef = useRef<TextInput | null>(null);

  const { q } = useLocalSearchParams<{ q: string }>();
  const [search, setSearch] = useState(q);
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const isScreenFocused = useNavigation().isFocused();

  const handleSubmit = () => {
    inputRef.current?.blur();

    if (search === q) return;

    router.push('/discover?q=' + search);
  };

  return (
    <Stack fg={1}>
      <DiscoverSearchInput
        ref={inputRef}
        value={search}
        onSubmit={handleSubmit}
        isFocused={isFocused}
        onFocusChange={setIsFocused}
        onChangeText={setSearch}
      />
      {isScreenFocused && (
        <PortalItem hostName={DISCOVER_SEARCH_OVERLAY}>
          <DiscoverSearchOverlay isFocused={isFocused} q={search} handleSubmit={handleSubmit} />
        </PortalItem>
      )}
    </Stack>
  );
};
