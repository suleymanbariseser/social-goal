import { useTheme } from '@emotion/react';
import { BaseButton } from './button';
import Color from 'color';

interface Props extends React.ComponentProps<typeof BaseButton> {
  children?: React.ReactNode;
}
export default function IconButton({ children, ...props }: Props) {
  const theme = useTheme();

  return (
    <BaseButton
      sx={{
        backgroundColor: Color(theme.palette.text.primary, 'hex')
          .alpha(0.1)
          .toString(),
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: 48,
        height: 48,
      }}
      {...props}
    >
      {children}
    </BaseButton>
  );
}
