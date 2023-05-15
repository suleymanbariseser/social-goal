import { StyleProp } from 'react-native';
import { Theme } from '../theme';
import Color from 'color';

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

function getDescendantProp(theme: Theme['palette'], property: string) {
  if (property.startsWith('rgb')) return undefined;

  return property.split('.').reduce((a, b) => a[b], theme);
}

export default function paletteTransform(style: StyleProp<any>, theme: Theme) {
  return Object.keys(style).reduce((acc, key) => {
    if (colorProperties.includes(key)) {
      const color = getDescendantProp(theme.palette, style[key]);

      acc[key] = color ?? style[key];
    } else {
      acc[key] = style[key];
    }
    return acc;
  }, {});
}
