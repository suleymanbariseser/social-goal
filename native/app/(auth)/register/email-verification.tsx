import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, YStack } from 'tamagui';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Text from '@/components/ui/text';

export default function EmailVerification() {
  const safeArea = useSafeAreaInsets();

  return (
    <YStack f={1} pt="$1" px="$1.5" pb={safeArea.bottom / 4}>
      <YStack gap="$0.5">
        <Text variant="headline1">Register</Text>
        <Stack maxWidth={220}>
          <Text variant="subtitle1">Be part of our network and plan your future</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$1" px="$1">
        <Input placeholder="First name" />
        <Input placeholder="Last name" />
        <Input placeholder="Email" />
      </YStack>
      <YStack ai="center" gap="$0.5">
        <Button>Continue</Button>
        <Text>
          Already have an account? <Text color="$primaryMain">Login</Text>
        </Text>
      </YStack>
    </YStack>
  );
}
