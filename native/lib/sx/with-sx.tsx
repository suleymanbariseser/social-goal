// create a hoc that will add sx prop if the given component has a style prop

import { useMemo } from 'react';
import transform from './transform';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/native';

type WithSxProps<P extends Record<string, any>> = P & { sx?: P['style'] };

export default function withSx<Props extends {}>(
  Component: React.ComponentType<Props>
) {
  return (props: WithSxProps<Props>) => {
    const { sx, ...rest } = props;
    const theme = useTheme();

    const style = useMemo(() => {
      const newStyle = transform(sx, theme);

      return css(newStyle);
    }, [sx, theme]);

    return <Component style={style} {...rest} />;
  };
}
