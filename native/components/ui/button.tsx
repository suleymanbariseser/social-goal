import styled, { css } from '@emotion/native';
import { Theme } from '../../lib/theme';
import Text from './Text';

interface BaseButtonProps {
  /**
   * @default 'md'
   */
  size?: keyof Theme['spacing'];

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
  ({ size = 'md', color = 'primary', variant = 'contained', ...props }) => ({
    display: 'flex',
    paddingVertical: props.theme.spacing[size],
    paddingHorizontal: props.theme.spacing.lg,
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

export const Button = ({ children, ...props }: ButtonProps) => {
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
};
