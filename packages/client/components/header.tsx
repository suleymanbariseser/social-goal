import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack } from 'tamagui';

import IconButton from './ui/icon-button';
import Text from './ui/text';

interface Props {
  back?: boolean;
  title: string;
}

export default function Header({ back, title }: Props) {
  const safeArea = useSafeAreaInsets();

  const router = useRouter();

  return (
    <XStack px="$4" pb="$4" pt={safeArea.top}>
      {back && (
        <IconButton
          icon={({ color }) => <AntDesign name="arrowleft" size={24} color="#fff" />}
          onPress={() => router.back()}
        />
      )}
      <XStack>
        <Text>{title}</Text>
      </XStack>
    </XStack>
  );
}
