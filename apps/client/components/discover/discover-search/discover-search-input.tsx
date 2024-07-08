import { X } from '@tamagui/lucide-icons';
import { useRef } from 'react';
import type { TextInput } from 'react-native';
import { SlideInRight } from 'react-native-reanimated';
import { Stack } from 'tamagui';

import { AnimatedStack } from '@/components/ui/animated-layout';
import { BaseInput } from '@/components/ui/form/input';
import { IconButton } from '@/components/ui/icon-button';

type Props = {
  value: string;
  isFocused: boolean;
  onFocusChange: (visible: boolean) => void;
  onSubmit: (value: string) => void;
  onChangeText: (value: string) => void;
};

export const DiscoverSearchInput = ({
  isFocused,
  onFocusChange,
  value,
  onSubmit,
  onChangeText,
}: Props) => {
  const inputRef = useRef<TextInput>(null);

  const handleXPress = () => {
    inputRef.current.blur();
  };

  const handleSubmit = () => {
    inputRef.current.blur();
    onSubmit(value);
  };

  return (
    <Stack fg={1} fd="row" ai="center" gap="$4">
      <Stack fg={1}>
        <BaseInput
          ref={inputRef}
          placeholder="Search..."
          value={value}
          onFocus={() => onFocusChange(true)}
          onBlur={() => onFocusChange(false)}
          onSubmitEditing={handleSubmit}
          onChangeText={onChangeText}
        />
      </Stack>
      {isFocused && (
        <AnimatedStack entering={SlideInRight}>
          <IconButton onPress={handleXPress} icon={X} />
        </AnimatedStack>
      )}
    </Stack>
  );
};
