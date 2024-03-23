import { X } from '@tamagui/lucide-icons';
import { useRef } from 'react';
import type { TextInput } from 'react-native';
import { SlideInRight } from 'react-native-reanimated';
import { Stack } from 'tamagui';
import { useStore } from 'zustand';

import { AnimatedStack } from '@/components/ui/animated-layout';
import { BaseInput } from '@/components/ui/form/input';
import { IconButton } from '@/components/ui/icon-button';
import { discoverStore } from '@/store/discover';

export const DiscoverSearchInput = () => {
  const inputRef = useRef<TextInput>(null);
  const { isSearchFocused, focusSearch, blurSearch } = useStore(discoverStore);

  const handleXPress = () => {
    inputRef.current.blur();
  };

  return (
    <Stack f={1} pl="$4" fd="row" ai="center" gap="$4">
      <Stack f={1}>
        <BaseInput
          ref={inputRef}
          placeholder="Search..."
          onFocus={focusSearch}
          onBlur={blurSearch}
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
