import { StyleProp } from 'react-native';
import { Theme } from '../theme';

const colorProperties = [
  'color',
  'backgroundColor',
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'shadowColor',
];

export default function paletteTransform(style: StyleProp<any>, theme: Theme) {
  return Object.keys(style).reduce((acc, key) => {
    if (colorProperties.includes(key)) {
      acc[key] = theme.palette[style[key]];
    } else {
      acc[key] = style[key];
    }
    return acc;
  }, {});
}
