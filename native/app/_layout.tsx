import { Slot } from 'expo-router';
import { StatusBar, View } from 'react-native';

export default function RootLayout() {
  return (
    <View className='flex-1 bg-slate-950'>
      <StatusBar barStyle="light-content" />
      <Slot />
    </View>
  );
}
