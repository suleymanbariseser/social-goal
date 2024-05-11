import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { YStack } from 'tamagui';

import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function Auth() {
  const router = useRouter();

  const handleEmail = () => {
    router.push('/login');
  };

  return (
    <YStack flex={1} gap="$8" px="$6" justifyContent="center">
      <Text variant="headline1">Let’s plan and communicate</Text>
      <YStack gap="$4">
        <Button startAdornment={<AntDesign name="apple1" size={20} color="black" />}>
          Continue with Apple
        </Button>
        <Button startAdornment={<AntDesign name="google" size={20} color="black" />}>
          Continue with Google
        </Button>
        <Button startAdornment={<AntDesign name="facebook-square" size={24} color="black" />}>
          Continue with Facebook
        </Button>
        <Button
          onPress={handleEmail}
          startAdornment={<MaterialIcons name="email" size={24} color="black" />}>
          Continue with Email
        </Button>
      </YStack>
    </YStack>
  );
}
