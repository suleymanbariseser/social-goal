import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, YStack } from 'tamagui';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Text from '@/components/ui/text';

export default function EmailVerification() {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();

  const handlePress = () => {
    router.push('/register/password');
  };

  return (
    <YStack f={1} pb={safeArea.bottom} gap="$4" px="$6">
      <YStack gap="$2">
        <Text variant="headline2">Verify Email</Text>
        <Stack>
          <Text variant="subtitle1">To continue using app, you must verify your email</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$4">
        <Input value="suleymanbariseser@gmail.com" disabled />
        <Input placeholder="Verification code" />
      </YStack>
      <YStack ai="center" gap="$2">
        <Button onPress={handlePress} w="100%">
          Continue
        </Button>
        <Text>
          Already have an account? <Text color="$primaryMain">Login</Text>
        </Text>
      </YStack>
    </YStack>
  );
}
