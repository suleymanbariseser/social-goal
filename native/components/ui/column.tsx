import styled from '@emotion/native';
import { Theme } from '../../lib/theme';

interface Props {
  /**
   * gap between items, value is multiplied by spacing
   *
   * @default 0
   */
  gap?: number;
}

const Column = styled.View<Props>(({ gap = 0, ...props }) => ({
  flexDirection: 'column',
  rowGap: gap * props.theme.spacing,
}));

export default Column;
