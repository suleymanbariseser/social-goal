import styled from '@emotion/native';
import { Theme } from '../../lib/theme';

interface Props {
  /**
   * gap between elements
   */
  gap?: keyof Theme['spacing'];
}

const Column = styled.View<Props>((props) => ({
  flexDirection: 'column',
  rowGap: props.gap && props.theme.spacing[props.gap],
}));

export default Column;
