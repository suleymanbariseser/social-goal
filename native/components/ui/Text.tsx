import transform from '@/lib/sx/transform';
import withSx from '@/lib/sx/with-sx';
import { Theme } from '@/lib/theme';
import styled from '@emotion/native';

interface TextProps {
  /**
   * @default 'text.primary'
   */
  color?: string;

  /**
   * @default 'body1'
   *  */
  variant?: keyof Theme['typography'];
}

const Text = styled.Text<TextProps>(
  ({ color = 'text.primary', variant = 'body1', ...props }) => ({
    ...transform(
      {
        color,
      },
      props.theme
    ),
    ...props.theme.typography[variant],
  })
);

export default withSx(Text);
