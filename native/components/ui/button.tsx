import styled, { css } from '@emotion/native';
import Text from './Text';
import { Theme } from '@/lib/theme';
import withSx from '@/lib/sx/with-sx';

interface BaseButtonProps {
  /**
   * @default 'primary'
   */
  color?: keyof Theme['palette'];

  /**
   * @default 'contained'
   */
  variant?: 'contained' | 'text';
}

const BaseButton = styled.TouchableOpacity<BaseButtonProps>(
  ({ color = 'primary', variant = 'contained', ...props }) => ({
    display: 'flex',
    paddingVertical: props.theme.spacing * 4,
    paddingHorizontal: props.theme.spacing * 6,
    backgroundColor:
      variant === 'contained' ? props.theme.palette[color] : 'transparent',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  })
);

interface ButtonProps extends BaseButtonProps {
  children: React.ReactNode;
}

export const Button = withSx(({ children, ...props }: ButtonProps) => {
  return (
    <BaseButton {...props} activeOpacity={0.7}>
      <Text
        style={css({
          fontWeight: '500',
        })}
        variant='body1'
      >
        {children}
      </Text>
    </BaseButton>
  );
});
