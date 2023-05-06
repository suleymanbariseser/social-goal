import styled from '@emotion/native';
import { View } from 'react-native';
import { Theme } from '../../lib/theme';

type Props = {
  /**
   * gap between elements
   */
  gap?: keyof Theme['spacing'];
};

const Row = styled.View<Props>((props) => ({
  flexDirection: 'row',
  columnGap: props.gap && props.theme.spacing[props.gap],
}));

export default Row;
