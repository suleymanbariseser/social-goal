import { StyleProp } from 'react-native';
import { Theme } from '../theme';
import paletteTransform from './palette';
import spacingTransform from './spacing';

export default function transform(style: StyleProp<any>, theme: Theme) {
  let newStyle = { ...style };
  newStyle = paletteTransform(newStyle, theme);
  newStyle = spacingTransform(newStyle, theme);

  return newStyle;
}
