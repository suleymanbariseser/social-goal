import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button, Text, XStack, YStack } from 'tamagui';

interface Props {
  back?: boolean;
  title: string;
}

export default function Header({ back, title }: Props) {
  const safeArea = useSafeAreaInsets();

  const router = useRouter();

  return (
    <YStack>
      {back && (
        <Button onPress={() => router.back()}>
          <AntDesign
            name='arrowleft'
            size={24}
            // color={theme.palette.text.primary}
          />
        </Button>
      )}
      <XStack>
        <Text>{title}</Text>
      </XStack>
    </YStack>
  );
}
