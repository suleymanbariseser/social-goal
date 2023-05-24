import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Stack, YStack } from 'tamagui';

import Input from '@/components/ui/input';
import Text from '@/components/ui/text';

export default function Login() {
  const safeArea = useSafeAreaInsets();

  return (
    <YStack f={1} pt="$1" px="$1.5" pb={safeArea.bottom / 4}>
      <YStack gap="$0.5">
        <Text variant="headline1">Welcome Back!</Text>
        <Stack maxWidth={220}>
          <Text variant="subtitle1">You’ve been missed</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$1" px="$1">
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Link href="/forgot-password">
          <Text color="primary.main">Forgot password?</Text>
        </Link>
      </YStack>
      <YStack ai="center" gap="$0.5">
        <Button>Login</Button>
        <Text>
          Do not have an account? <Text color="primary.main">Sign up</Text>
        </Text>
      </YStack>
    </YStack>
  );
}
