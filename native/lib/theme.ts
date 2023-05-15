import { TextStyle } from 'react-native';

const createTypography = (fontSize: number, lineHeight: number): TextStyle => ({
  fontSize,
  lineHeight,
});

type TextVariant = 'headline1' | 'headline2' | 'headline3' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'body3' | 'caption';

const palette = {
  primary: {
    main: '#1D4ED8',
    light: '#60A5FA',
  },
  secondary: {
    main: '#A21CAF',
    light: '#E879F9',
  },
  success: {
    main: '#05A660',
  },
  error: {
    main: '#E53535',
  },
  warning: { main: '#E57A00' },
  info: { main: '#00B7C4' },
  background: {
    default: '#0D0D0D',
    paper: '#D9D9D9',
    box: '#50546B',
  },
  text: { primary: '#FFFFFF', secondary: '#E4E4EB' },
}

const typography: Record<TextVariant, TextStyle> = {
  headline1: {
    ...createTypography(36, 45),
    fontWeight: '700'
  },
  headline2: {
    ...createTypography(30, 37.5),
    fontWeight: '700'
  },
  headline3: {
    ...createTypography(24, 30),
    fontWeight: '700'
  },
  subtitle1: {
    ...createTypography(18, 22.5),
    fontWeight: '500'
  },
  subtitle2: {
    ...createTypography(16, 20),
    fontWeight: '500'
  },
  body1: {
    ...createTypography(16, 20),
    fontWeight: '400'
  },
  body2: {
    ...createTypography(14, 17.5),
    fontWeight: '400'
  },
  body3: {
    ...createTypography(12, 15),
    fontWeight: '400'
  },
  caption: {
    ...createTypography(10, 12.5),
    fontWeight: '400'
  }
}

const theme = {
  palette,
  typography,
  spacing: 4,
};

export type Theme = typeof theme;

export default theme;
