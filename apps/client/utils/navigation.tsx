import { getTokens } from 'tamagui';

import { Header } from '@/components/header';
import { NativeStackNavigationOptions } from '@/types/navigation';

export const getCommonHeaderOptions = (): NativeStackNavigationOptions => ({
  header: (props) => <Header {...props} />,
});

export const getCommonContentOptions = (): NativeStackNavigationOptions => ({
  contentStyle: {
    backgroundColor: getTokens().color.$backgroundMain.val,
    paddingTop: getTokens().space.$4.val,
  },
});
