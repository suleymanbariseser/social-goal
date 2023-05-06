import styled from '@emotion/native';

type Props = {
  /**
   * gap between items, value is multiplied by spacing
   *
   * @default 0
   */
  gap?: number;
};

const Row = styled.View<Props>(({ gap = 0, ...props }) => ({
  flexDirection: 'row',
  columnGap: gap * props.theme.spacing,
}));

export default Row;
