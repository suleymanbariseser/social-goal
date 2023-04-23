import styled, { css } from '@emotion/native';
import { Theme } from '../../lib/theme';
import Text from './Text';

interface BaseButtonProps {
  /**
   * @default 'md'
   */
  size?: Theme['spacing'];

  /**
   * @default 'primary'
   */
  color?: Theme['colors'];

  /**
   * @default 'contained'
   */
  variant?: 'contained' | 'text';
}

const BaseButton = styled.TouchableOpacity<BaseButtonProps>(
  ({ size = 'md', color = 'primary', variant = 'contained', ...props }) => ({
    display: 'flex',
    padding: props.theme.spacing[size],
    backgroundColor:
      variant === 'contained' ? props.theme.colors[color] : 'transparent',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  })
);

interface ButtonProps extends BaseButtonProps {
  children: React.ReactNode
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <BaseButton {...props}>
      <Text
        style={css({
          fontWeight: '500',
        })}
      >
        {children}
      </Text>
    </BaseButton>
  );
};