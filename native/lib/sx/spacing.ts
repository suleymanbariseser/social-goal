import { StyleProp } from 'react-native';
import { Theme } from '../theme';

const spacingProperties = [
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'paddingVertical',
  'paddingHorizontal',
  'margin',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'marginVertical',
  'marginHorizontal',
  'gap',
  'columnGap',
  'rowGap',
];

export default function spacingTransform(style: StyleProp<any>, theme: Theme) {
  return Object.keys(style).reduce((acc, key) => {
    if (spacingProperties.includes(key) && typeof style[key] === 'number') {
      acc[key] = theme.spacing * style[key];
    } else {
      acc[key] = style[key];
    }
    return acc;
  }, {});
}
