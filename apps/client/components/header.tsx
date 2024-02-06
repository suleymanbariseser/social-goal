import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack } from 'tamagui';

import { IconButton } from './ui/icon-button';
import { Text } from './ui/text';

interface Props {
  back?: boolean;
  title: string;
}

export const Header = ({ back, title }: Props) => {
  const safeArea = useSafeAreaInsets();

  const router = useRouter();

  return (
    <XStack px="$4" pb="$4" pt={safeArea.top}>
      {back && <IconButton icon={ArrowLeft} onPress={() => router.back()} />}
      <XStack>
        <Text>{title}</Text>
      </XStack>
    </XStack>
  );
};
