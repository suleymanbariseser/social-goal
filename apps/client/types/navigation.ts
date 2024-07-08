import { Stack } from 'expo-router';

export type ScreenOptions = React.ComponentProps<typeof Stack>['screenOptions'];

export type GetNavigationStack<TType> = TType extends (props: any) => any ? never : TType;

// return type from ScreenOptions that is not a function
export type NativeStackNavigationOptions = GetNavigationStack<ScreenOptions>;
