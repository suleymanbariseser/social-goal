import { ArrowLeft } from '@tamagui/lucide-icons';
import { Stack, useRouter } from 'expo-router';
import { getTokens } from 'tamagui';

import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';

type ScreenOptions = React.ComponentProps<typeof Stack>['screenOptions'];

export const getCommonHeaderOptions = (): ScreenOptions => ({
  headerStyle: {
    backgroundColor: getTokens().color.$backgroundMain.val,
  },
  headerTitle: (props) => props.children && <Text variant="subtitle1">{props.children}</Text>,
  headerTintColor: getTokens().color.$textPrimary.val,
  headerBackTitleVisible: false,
  headerLeft: ({ canGoBack }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    return canGoBack && <IconButton icon={ArrowLeft} onPress={router.back} />;
  },
});

export const getCommonContentOptions = (): ScreenOptions => ({
  contentStyle: {
    backgroundColor: getTokens().color.$backgroundMain.val,
  },
});
