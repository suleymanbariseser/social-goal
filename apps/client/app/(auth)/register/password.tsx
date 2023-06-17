import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, YStack } from 'tamagui';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Text from '@/components/ui/text';

export default function Password() {
  const safeArea = useSafeAreaInsets();
  const router = useRouter();

  const handlePress = () => {
    router.push('/register/email-verification');
  };

  return (
    <YStack f={1} pb={safeArea.bottom} gap="$4" px="$6">
      <YStack gap="$2">
        <Text variant="headline2">Enter Password</Text>
        <Stack>
          <Text variant="subtitle1">Create a password that you are going to use to login app</Text>
        </Stack>
      </YStack>
      <YStack f={1} gap="$4">
        <Input placeholder="Password" />
        <Input placeholder="Confirm password" />
      </YStack>
      <YStack ai="center" gap="$2">
        <Button onPress={handlePress} w="100%">
          Register
        </Button>
        <Text>
          Already have an account? <Text color="$primaryMain">Login</Text>
        </Text>
      </YStack>
    </YStack>
  );
}
