import { X } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import type { TextInput } from 'react-native';
import { SlideInRight } from 'react-native-reanimated';
import { Stack } from 'tamagui';
import { useStore } from 'zustand';

import { AnimatedStack } from '@/components/ui/animated-layout';
import { BaseInput } from '@/components/ui/form/input';
import { IconButton } from '@/components/ui/icon-button';
import { discoverStore } from '@/store/discover';

type SearchParams = {
  q: string;
};

export const DiscoverSearchInput = () => {
  const inputRef = useRef<TextInput>(null);
  const { q } = useLocalSearchParams<SearchParams>();
  const router = useRouter();

  const { isSearchFocused, focusSearch, blurSearch, updateSearch, search } =
    useStore(discoverStore);

  const handleXPress = () => {
    inputRef.current.blur();

    updateSearch(q);
  };

  const handleSubmit = () => {
    inputRef.current.blur();

    router.setParams({ q: search });
  };

  return (
    <Stack f={1} pl="$4" fd="row" ai="center" gap="$4">
      <Stack f={1}>
        <BaseInput
          ref={inputRef}
          placeholder="Search..."
          value={search}
          onFocus={focusSearch}
          onBlur={blurSearch}
          onSubmitEditing={handleSubmit}
          onChangeText={(value) => updateSearch(value)}
        />
      </Stack>
      {isSearchFocused && (
        <AnimatedStack entering={SlideInRight}>
          <IconButton onPress={handleXPress} icon={X} />
        </AnimatedStack>
      )}
    </Stack>
  );
};
