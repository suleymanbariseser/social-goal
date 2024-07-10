import { ArrowLeft } from '@tamagui/lucide-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTokens, XStack } from 'tamagui';

import { IconButton } from './ui/icon-button';
import { Text } from './ui/text';

import { NativeStackNavigationOptions } from '@/types/navigation';

type NativeStackHeaderProps = Parameters<NativeStackNavigationOptions['header']>[0];

type Props = {
  title?: React.ReactNode;
} & NativeStackHeaderProps;

export const Header = ({ back, options, navigation, title }: Props) => {
  const safeArea = useSafeAreaInsets();

  const hasAction = !!options?.headerRight;

  return (
    <XStack px="$4" pt={safeArea.top} bg="$backgroundMain" gap="$4">
      {navigation.canGoBack() && back && (
        <XStack w={40}>
          <IconButton icon={ArrowLeft} onPress={navigation.goBack} />
        </XStack>
      )}
      <XStack fg={1} ai="center" jc="center">
        {
          // if we have a custom title component, render it
          title ? (
            title
          ) : typeof options.title === 'string' ? (
            <Text variant="subtitle1">{options.title}</Text>
          ) : (
            options.title
          )
        }
      </XStack>
      {hasAction && (
        <XStack>
          {options.headerRight({
            canGoBack: navigation.canGoBack(),
            tintColor: getTokens().color.$textPrimary.val,
          })}
        </XStack>
      )}
    </XStack>
  );
};
