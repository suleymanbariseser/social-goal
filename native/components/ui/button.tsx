import styled, { css } from '@emotion/native';
import Text from './Text';
import { Theme } from '@/lib/theme';
import withSx from '@/lib/sx/with-sx';
import transform from '@/lib/sx/transform';

interface BaseButtonProps {
  /**
   * @default 'text.primary'
   */
  color?: string;

  /**
   * @default 'contained'
   */
  variant?: 'contained' | 'text';
}

const BaseButton = styled.TouchableOpacity<BaseButtonProps>(
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
);

interface ButtonProps extends BaseButtonProps {
  children: React.ReactNode;
}

export const Button = withSx(({ children, ...props }: ButtonProps) => {
  return (
    <BaseButton {...props} activeOpacity={0.7}>
      <Text variant='subtitle1' color='background.default' >{children}</Text>
    </BaseButton>
  );
});
