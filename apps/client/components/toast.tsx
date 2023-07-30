import { Toast, ToastViewport, useToastState } from '@tamagui/toast';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ColorTokens, YStack } from 'tamagui';

export const AppToastViewport = () => {
  const insets = useSafeAreaInsets();

  return <ToastViewport w="100%" top={insets.top} left={insets.left} right={insets.right} />;
};

export const AppToast = () => {
  const currentToast = useToastState();

  const color = useMemo<ColorTokens>(() => {
    switch (currentToast?.variant) {
      case 'success':
        return '$successMain';
      case 'error':
        return '$errorMain';
      case 'warning':
        return '$warningMain';
      default:
        return '$backgroundBox';
    }
  }, [currentToast?.variant]);

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="quick"
      bg={color}
      viewportName={currentToast.viewportName}>
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
      </YStack>
    </Toast>
  );
};
