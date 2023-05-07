import transform from '@/lib/sx/transform';
import withSx from '@/lib/sx/with-sx';
import styled from '@emotion/native';

interface Props {
  /**
   * gap between items, value is multiplied by spacing
   *
   * @default 0
   */
  gap?: number;
}

const Column = styled.View<Props>(({ gap = 0, ...props }) =>
  transform(
    {
      flexDirection: 'column',
      rowGap: gap,
    },
    props.theme
  )
);

export default withSx(Column);
