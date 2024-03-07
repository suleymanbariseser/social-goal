import { ArrowLeft, X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack } from 'tamagui';

import { IconButton } from './ui/icon-button';

interface Props {
  back?: boolean;
  title?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Header = ({ back, title, actions }: Props) => {
  const safeArea = useSafeAreaInsets();

  const router = useRouter();

  return (
    <XStack px="$4" pb="$4" pt={safeArea.top}>
      <XStack w={40}>
        {back && <IconButton icon={ArrowLeft} onPress={() => router.back()} />}
      </XStack>
      <XStack fg={1} ai="center" jc="center">
        {title}
      </XStack>
      <XStack w={40}>{actions}</XStack>
    </XStack>
  );
};
