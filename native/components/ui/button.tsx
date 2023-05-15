import styled from '@emotion/native';
import Text from './text';
import withSx from '@/lib/sx/with-sx';
import transform from '@/lib/sx/transform';
import { TouchableOpacityProps } from 'react-native/types';

interface BaseButtonProps extends TouchableOpacityProps {
  /**
   * @default 'text.primary'
   */
  color?: string;

  /**
   * @default 'contained'
   */
  variant?: 'contained' | 'text';
}

export const BaseButton = withSx(
  styled.TouchableOpacity<BaseButtonProps>(
    ({ color = 'text.primary', variant = 'contained', ...props }) =>
      transform(
        {
          display: 'flex',
          paddingVertical: 4,
          paddingHorizontal: 6,
          backgroundColor: variant === 'contained' ? color : 'transparent',
          borderRadius: 999,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.theme
      )
  )
);

interface ButtonProps extends React.ComponentProps<typeof BaseButton> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <BaseButton {...props} activeOpacity={0.7}>
      <Text variant='subtitle1' color='background.default'>
        {children}
      </Text>
    </BaseButton>
  );
};
