import { Theme } from '@/lib/theme';
import styled from '@emotion/native';
import type { TextStyle } from 'react-native';

const createTextVariant = (
  size: number,
  weight: TextStyle['fontWeight']
): Pick<TextStyle, 'fontWeight' | 'fontSize'> => ({
  fontSize: size,
  fontWeight: weight,
});

const textVariants = {
  headline1: createTextVariant(26, 'bold'),
  headline2: createTextVariant(24, 'bold'),
  headline3: createTextVariant(22, 'bold'),
  body1: createTextVariant(16, '400'),
  body2: createTextVariant(14, '400'),
};

interface TextProps {
  /**
   * @default 'text'
   */
  color?: keyof Theme['palette'];

  /**
   * @default 'body1'
   *  */
  variant?: keyof typeof textVariants;
}

const Text = styled.Text<TextProps>(
  ({ color = 'text', variant = 'body1', ...props }) => ({
    color: props.theme.palette[color],
    ...textVariants[variant],
    fontFamily: 'sans-serif'
  })
);

export default Text;
