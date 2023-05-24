import { YStack } from 'tamagui';

import Button from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import Input from '@/components/ui/input';
import Text from '@/components/ui/text';

export default function Auth() {
  return (
    <YStack flex={1} gap="$8" px="$6" justifyContent="center">
      <Text variant="headline1">Let’s plan and communicate</Text>
      <YStack gap="$4">
        <Button>Continue with Google</Button>
        <Button>Continue with Facebook</Button>
        <Divider content={<Text variant="subtitle2">OR</Text>} />
        <Input placeholder="Email" />
        <Button onPress={console.log}>Next</Button>
      </YStack>
    </YStack>
  );
}
