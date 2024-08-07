import { useRouter, useNavigation } from 'expo-router';
import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import { PortalItem, Stack } from 'tamagui';

import { DiscoverSearchInput } from '../discover-search/discover-search-input';
import { DiscoverSearchOverlay } from '../discover-search/discover-search-overlay';
import { DiscoverLocalSearchParams } from '../types';

import { DISCOVER_SEARCH_OVERLAY } from '@/constants/discover';
import { trpc } from '@/lib/trpc';

type Props = DiscoverLocalSearchParams;

export const DiscoverHeaderTitle = ({ q }: Props) => {
  const inputRef = useRef<TextInput | null>(null);

  const [search, setSearch] = useState(q);
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const isScreenFocused = useNavigation().isFocused();
  const { mutate: addRecentSearch } = trpc.discover.recentSearches.add.useMutation();

  const handleSubmit = () => {
    inputRef.current?.blur();

    if (search === q) return;

    router.push('/discover/(tabs)?q=' + search);
    addRecentSearch({ type: 'text', text: search });
  };

  const handleBlur = () => {
    setIsFocused(false);
    // reset search to previous value
    setSearch(q);
  };

  return (
    <Stack fg={1}>
      <DiscoverSearchInput
        ref={inputRef}
        value={search}
        onSubmitEditing={handleSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        isFocused={isFocused}
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
