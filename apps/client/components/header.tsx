import { ArrowLeft } from '@tamagui/lucide-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack } from 'tamagui';

import { IconButton } from './ui/icon-button';
import { Text } from './ui/text';

import { NativeStackNavigationOptions } from '@/types/navigation';

export const Header: NativeStackNavigationOptions['header'] = ({ back, options, navigation }) => {
  const safeArea = useSafeAreaInsets();

  const hasAction = !!options.headerRight;

  return (
    <XStack px="$4" pt={safeArea.top} bg="$backgroundMain">
      {navigation.canGoBack() && (
        <XStack w={40}>
          {back && <IconButton icon={ArrowLeft} onPress={navigation.goBack} />}
        </XStack>
      )}
      <XStack fg={1} ai="center" jc="center">
        {typeof options.title === 'string' ? <Text>{options.title}</Text> : options.title}
      </XStack>
      {hasAction && (
        <XStack>
          {options.headerRight({
            canGoBack: navigation.canGoBack(),
            tintColor: options.headerTintColor,
          })}
        </XStack>
      )}
    </XStack>
  );
};
