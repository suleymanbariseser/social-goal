import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, YStack } from 'tamagui';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Text from '@/components/ui/text';

export default function Login() {
  const safeArea = useSafeAreaInsets();

  return (
    <YStack f={1} pb={safeArea.bottom} gap="$4" px="$6">
      <YStack gap="$2">
        <Text variant="headline2">Welcome Back!</Text>
        <Stack maxWidth={220}>
          <Text variant="subtitle1">You’ve been missed</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$4">
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Link href="/forgot-password">
          <Text color="$primaryMain">Forgot password?</Text>
        </Link>
      </YStack>
      <YStack ai="center" gap="$2">
        <Button w="100%">Login</Button>
        <Text>
          Do not have an account? <Text color="$primaryMain">Sign up</Text>
        </Text>
      </YStack>
    </YStack>
  );
}
