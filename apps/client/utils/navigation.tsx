import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTokens } from 'tamagui';

import { Header } from '@/components/header';
import { NativeStackNavigationOptions } from '@/types/navigation';

export const getCommonHeaderOptions = (): NativeStackNavigationOptions => ({
  header: (props) => <Header {...props} />,
});

export const useCommonContentOptions = (): NativeStackNavigationOptions => {
  const safeArea = useSafeAreaInsets();

  return {
    contentStyle: {
      backgroundColor: getTokens().color.$backgroundMain.val,
      paddingBottom: safeArea.bottom,
      paddingTop: getTokens().space.$4.val,
    },
  };
};
